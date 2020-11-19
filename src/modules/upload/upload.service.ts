import { Injectable } from '@nestjs/common';
import gm, { Dimensions } from 'gm';
import got, { Got } from 'got';
import FormData from 'form-data';
import { createReadStream, readFile, writeFile, createFile, unlink } from 'fs-extra';
import { extname, basename, resolve } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { PictureRepresentationsRepository } from '@modules/pictures/repositories/picture-representations.repository';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { User } from '@modules/users/entities/users.entity';
import { BadRequestException, InternalServerErrorException } from '@common/exceptions/exceptions';
import { CompressedPicture } from '@modules/upload/types/compressed-picture';
import { DiscordMessage } from '@modules/upload/types/DiscordMessage';
import { UploadedPicture } from '@modules/upload/types/uploaded-picture';
import { Utils } from '@common/utils/utils';

@Injectable()
export class UploadService {
  private readonly httpClient: Got;

  constructor(
    @InjectRepository(PicturesRepository) private readonly picturesRepository: PicturesRepository,
    @InjectRepository(PictureRepresentationsRepository)
    private readonly pictureRepresentationsRepository: PictureRepresentationsRepository,
  ) {
    this.httpClient = got.extend({
      prefixUrl: `https://discord.com/api/v${process.env.DISCORD_API_VERSION}/`,
      headers: {
        Authorization: `${process.env.DISCORD_API_TOKEN}`,
      },
    });
  }

  async uploadPicture(file: Express.Multer.File, user: User): Promise<Picture> {
    if (!file) throw new BadRequestException('NO_FILE_PROVIDED');
    const path = Utils.getRandomString(24);
    try {
      file.buffer = await readFile(file.path);
      const { s, m } = await this.compressImage(file);
      const message = await this.uploadFileToDiscord(file);
      const attachment = message.attachments[0];

      const filename = basename(file.originalname, extname(file.originalname))
        .replace(/[^a-z0-9_\-+]/, '_')
        .substr(0, 100);
      const [sPath, mPath] = [
        this.generateObjectPath({
          path: path + '/s',
          name: filename,
          ext: 'jpeg',
        }),
        this.generateObjectPath({
          path: path + '/m',
          name: filename,
          ext: 'jpeg',
        }),
      ];

      await Promise.all([createFile(process.env.UPLOAD_DIR + sPath), createFile(process.env.UPLOAD_DIR + mPath)]);
      await Promise.all([
        writeFile(process.env.UPLOAD_DIR + sPath, s.buffer),
        writeFile(process.env.UPLOAD_DIR + mPath, m.buffer),
      ]);

      await unlink(file.path);

      return this.savePicture(user.id, {
        s: { key: sPath, dimensions: s.dimensions, size: s.size },
        m: { key: mPath, dimensions: m.dimensions, size: m.size },
        o: {
          key: attachment.proxy_url,
          dimensions: {
            height: attachment.height,
            width: attachment.width,
          },
          size: attachment.size,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('UNKNOWN');
    }
  }

  generateObjectPath(options: { path?: string; name?: string; ext?: string }): string {
    if (!options.path) options.path = Utils.getRandomString(64);
    if (!options.name) options.name = Utils.getRandomString(8);
    if (!options.ext) options.ext = 'jpeg';
    else options.ext = options.ext.replace(/^\./, '');
    return `${Utils.getDate()}/${options.path}/${options.name}.${options.ext}`.replace(/\/\//g, '');
  }

  async savePicture(ownerId: number, representations: UploadedPicture): Promise<Picture> {
    const types: (keyof UploadedPicture)[] = ['s', 'm', 'o'];

    const representationEntities = types.map((type) =>
      this.pictureRepresentationsRepository.create({
        height: representations[type].dimensions.height,
        width: representations[type].dimensions.width,
        size: representations[type].size,
        path: representations[type].key,
      }),
    );

    const [s, m, o] = await this.pictureRepresentationsRepository.save(representationEntities);

    const picture = this.picturesRepository.create({
      ownerId,
      sId: s.id,
      mId: m.id,
      oId: o.id,
    });
    return this.picturesRepository.saveAndReturn(picture);
  }

  async uploadFileToDiscord(file: Express.Multer.File): Promise<DiscordMessage> {
    try {
      const form = new FormData();
      form.append('file', createReadStream(resolve(file.path)), file.originalname);
      const message = await this.httpClient
        .post(`channels/${process.env.DISCORD_UPLOAD_CHANNEL_ID}/messages`, {
          body: form,
        })
        .json<DiscordMessage>();
      if (!message.attachments[0]) throw new InternalServerErrorException('UNKNOWN');
      return message;
    } catch (e) {
      throw new InternalServerErrorException('UNKNOWN');
    }
  }

  scale(dimensions: Dimensions, ratio: number, limit?: number): Dimensions {
    let height = dimensions.height;
    let width = dimensions.width;

    height *= Math.abs(ratio);
    width *= Math.abs(ratio);

    if (ratio < 1) {
      if (limit) {
        if (dimensions.width > limit && dimensions.height > limit) {
          if (dimensions.width < dimensions.height) {
            width = limit;
            height = Math.floor(limit * (dimensions.height / dimensions.width));
          } else if (dimensions.height < dimensions.width) {
            height = limit;
            width = Math.floor(limit * (dimensions.width / dimensions.height));
          } else {
            height = limit;
            width = limit;
          }
        } else {
          return { height: dimensions.height, width: dimensions.width };
        }
      }
    }

    return { height, width };
  }

  async compressImage(picture: Express.Multer.File): Promise<CompressedPicture> {
    const s = gm(picture.buffer).noProfile().setFormat('jpeg').resize(128, 128).quality(98);
    const m = gm(picture.buffer).noProfile().setFormat('jpeg').resize(512, 512).quality(90);

    const [sBuffer, mBuffer] = await Promise.all([this.gmToBuffer(s), this.gmToBuffer(m)]);
    const [sSize, mSize] = [this.bufferToFileSize(sBuffer), this.bufferToFileSize(mBuffer)];
    const sDimensions = await this.gmToDimensions(gm(sBuffer));
    const mDimensions = await this.gmToDimensions(gm(mBuffer));

    return {
      s: { buffer: sBuffer, dimensions: sDimensions, size: sSize },
      m: { buffer: mBuffer, dimensions: mDimensions, size: mSize },
    };
  }

  gmToBuffer(data: gm.State): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      data.stream((err, stdout, stderr) => {
        if (err) return reject(err);
        const chunks: any[] = [];
        stdout.on('data', (chunk) => {
          chunks.push(chunk);
        });
        // these are 'once' because they can and do fire multiple times for multiple errors,
        // but this is a promise so you'll have to deal with them one at a time
        stdout.once('end', () => {
          resolve(Buffer.concat(chunks));
        });
        stderr.once('data', (data) => {
          if (!/known incorrect .* profile/.test(String(data))) reject(String(data));
        });
      });
    });
  }

  gmToDimensions(data: gm.State): Promise<Dimensions> {
    return new Promise((resolve, reject) => {
      data.size((err, dimensions) => {
        if (err) return reject(err);
        resolve(dimensions);
      });
    });
  }

  bufferToFileSize(buffer: Buffer): number {
    return buffer.byteLength;
  }
}
