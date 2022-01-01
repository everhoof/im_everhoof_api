import { Injectable, Logger } from '@nestjs/common';
import gm, { Dimensions } from 'gm';
import got, { Got } from 'got';
import FormData from 'form-data';
import { writeFile, createFile } from 'fs-extra';
import { extname, basename } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { PictureRepresentationsRepository } from '@modules/pictures/repositories/picture-representations.repository';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { User } from '@modules/users/entities/users.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnsupportedMediaTypeException,
} from '@modules/common/exceptions/exceptions';
import { CompressedPicture } from '@modules/upload/types/compressed-picture';
import { DiscordMessage } from '@modules/upload/types/DiscordMessage';
import { UploadedPicture, UploadedPictureRepresentation } from '@modules/upload/types/uploaded-picture';
import { Utils } from '@modules/common/utils/utils';
import { fromBuffer } from 'file-type';
import { imageSize } from 'image-size';

@Injectable()
export class UploadService {
  private static QUEUE_LIMIT = parseInt(process.env.UPLOAD_QUEUE_LIMIT || '16', 10) || 16;
  private static MIN_HEIGHT = parseInt(process.env.UPLOAD_MIN_HEIGHT || '10', 10) || 10;
  private static MIN_WIDTH = parseInt(process.env.UPLOAD_MIN_WIDTH || '10', 10) || 10;
  private static MAX_HEIGHT = parseInt(process.env.UPLOAD_MAX_HEIGHT || '9000', 10) || 9000;
  private static MAX_WIDTH = parseInt(process.env.UPLOAD_MAX_WIDTH || '9000', 10) || 9000;
  private static GM_MEMORY_LIMIT = process.env.GM_MEMORY_LIMIT || '900M';
  private static GM_THREADS_LIMIT = process.env.GM_THREADS_LIMIT || '1';

  private readonly httpClient: Got;
  private static queue: string[] = [];
  private readonly logger = new Logger(UploadService.name, true);

  constructor(
    @InjectRepository(PicturesRepository) private readonly picturesRepository: PicturesRepository,
    @InjectRepository(PictureRepresentationsRepository)
    private readonly pictureRepresentationsRepository: PictureRepresentationsRepository,
  ) {
    this.httpClient = got.extend({
      prefixUrl: `https://discord.com/api/v${process.env.DISCORD_API_VERSION}/`,
      headers: {
        Authorization: `Bot ${process.env.DISCORD_API_TOKEN}`,
      },
    });
  }

  async uploadPicture(file: Express.Multer.File, user: User, source?: string): Promise<Picture> {
    if (UploadService.queue.length > UploadService.QUEUE_LIMIT) {
      throw new ServiceUnavailableException('SERVER_IS_OVERLOADED');
    }

    if (!file) throw new BadRequestException('NO_FILE_PROVIDED');
    const path = Utils.getRandomString(24);

    const fileType = await fromBuffer(file.buffer);
    if (!fileType?.ext.match(/(jpg|jpeg|png)/)) {
      throw new UnsupportedMediaTypeException('UNSUPPORTED_MEDIA_TYPE');
    }

    const gmInstance = gm(file.buffer);
    const dimensions = await this.gmToDimensions(gmInstance);
    if (dimensions.height < UploadService.MIN_HEIGHT || dimensions.width < UploadService.MIN_WIDTH) {
      throw new BadRequestException('IMAGE_CORRUPTED');
    }
    if (dimensions.height > UploadService.MAX_HEIGHT || dimensions.width > UploadService.MAX_WIDTH) {
      throw new BadRequestException('IMAGE_DIMENSIONS_TOO_LARGE');
    }

    const id = file.originalname + '_' + Date.now() + '_' + user.id;
    UploadService.queue.push(id);
    await Utils.conditionalWait(() => !!UploadService.queue.length && UploadService.queue[0] === id);

    try {
      let attachment;
      if (!source) {
        const message = await this.uploadFileToDiscord(file);
        attachment = message.attachments[0];
      }
      const { s, m } = await this.compressImage(gmInstance);

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

      await Promise.all([
        //
        createFile(process.env.UPLOAD_DIR + sPath),
        createFile(process.env.UPLOAD_DIR + mPath),
      ]);
      await Promise.all([
        //
        writeFile(process.env.UPLOAD_DIR + sPath, s.buffer),
        writeFile(process.env.UPLOAD_DIR + mPath, m.buffer),
      ]);

      let o: UploadedPictureRepresentation;
      if (source) {
        o = {
          key: source,
          dimensions: imageSize(file.buffer) as Dimensions,
          size: this.bufferToFileSize(file.buffer),
        };
      } else {
        o = {
          key: attachment.proxy_url,
          dimensions: {
            height: attachment.height,
            width: attachment.width,
          },
          size: attachment.size,
        };
      }
      const picture = await this.savePicture(user.id, {
        s: { key: sPath, dimensions: imageSize(s.buffer) as Dimensions, size: s.size },
        m: { key: mPath, dimensions: imageSize(m.buffer) as Dimensions, size: m.size },
        o: o,
      });

      UploadService.queue.shift();
      return picture;
    } catch (e) {
      this.logger.debug(e);
      UploadService.queue.shift();
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
      form.append('file', file.buffer, file.originalname);
      const message = await this.httpClient
        .post(`channels/${process.env.DISCORD_UPLOAD_CHANNEL_ID}/messages`, {
          body: form,
        })
        .json<DiscordMessage>();
      if (!message.attachments[0]) throw new InternalServerErrorException('UNKNOWN');
      return message;
    } catch (e) {
      this.logger.debug(e);
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

  async compressImage(gmInstance: gm.State): Promise<CompressedPicture> {
    const m = gmInstance
      .noProfile()
      .setFormat('jpeg')
      .resize(512, 512, '>')
      .quality(90)
      .limit('memory', UploadService.GM_MEMORY_LIMIT)
      .limit('threads', UploadService.GM_THREADS_LIMIT);
    const mBuffer = await this.gmToBuffer(m);

    const s = gm(mBuffer).noProfile().setFormat('jpeg').resize(128, 128, '>').quality(98);
    const sBuffer = await this.gmToBuffer(s);

    const [sSize, mSize] = [this.bufferToFileSize(sBuffer), this.bufferToFileSize(mBuffer)];

    return {
      s: { buffer: sBuffer, size: sSize },
      m: { buffer: mBuffer, size: mSize },
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
