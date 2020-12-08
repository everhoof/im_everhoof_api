import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from '@modules/messages/repositories/messages.repository';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { Message } from '@modules/messages/entities/messages.entity';
import { User } from '@modules/users/entities/users.entity';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { BadRequestException } from '@common/exceptions/exceptions';
import got from 'got';
import { writeFile } from 'fs-extra';
import { Utils } from '@common/utils/utils';
import { PubSub } from 'graphql-subscriptions';
import { basename } from 'path';
import { UploadService } from '@modules/upload/upload.service';
import { escapeHtml } from 'xss';
import { DeleteMessageArgs } from '@modules/messages/args/delete-message.args';
import { IsNull } from 'typeorm';
import { roles } from '../../app.roles';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
    @InjectRepository(MessagesRepository)
    private readonly messagesRepository: MessagesRepository,
    @InjectRepository(PicturesRepository)
    private readonly picturesRepository: PicturesRepository,
    private readonly uploadService: UploadService,
  ) {}

  async createMessage(args: CreateMessageArgs, user: User): Promise<Message> {
    if (!args.content?.trim() && args.pictures.length === 0)
      throw new BadRequestException('CANNOT_CREATE_EMPTY_MESSAGE');
    let message = this.messagesRepository.create({
      content: escapeHtml(args.content?.trim() || ''),
      ownerId: user.id,
      username: user.username.trim(),
      randomId: args.randomId?.trim(),
    });
    message.pictures = args.pictures.map((id) => this.picturesRepository.create({ id }));
    message = await this.uploadImagesFromMessage(message, user);
    return this.messagesRepository.save(message);
  }

  private async uploadImagesFromMessage(message: Message, user: User): Promise<Message> {
    if (!message.content) return message;
    if (/^\\(https?:\/\/.*?\.(?:png|jpg))$/i.test(message.content)) {
      message.content = message.content.slice(1);
      return message;
    }
    if (!/^(https?:\/\/.*?\.(?:png|jpg))$/i.test(message.content)) return message;

    const buffer = await got(message.content).buffer();
    const filename = Utils.getRandomString(32);
    const path = './uploads/' + filename;
    await writeFile(path, buffer);
    const file: Express.Multer.File = {
      path,
      buffer,
      originalname: basename(message.content),
      filename,
    } as Express.Multer.File;
    const picture = await this.uploadService.uploadPicture(file, user);
    message.pictures = [picture];
    message.content = '';
    return message;
  }

  async getMessages(args: GetMessagesArgs, user?: User): Promise<Message[]> {
    const canReadAny: boolean = (user && roles.can(user?.roleNames).readAny('message').granted) || false;
    if (canReadAny) return this.messagesRepository.getList(args, { order: { id: 'DESC' } });
    return this.messagesRepository.getList(args, { where: { deletedAt: IsNull() }, order: { id: 'DESC' } });
  }

  async deleteMessage(args: DeleteMessageArgs, user: User): Promise<Message> {
    const canDeleteAny: boolean = roles.can(user.roleNames).deleteAny('message').granted;
    const canDeleteOwn: boolean = roles.can(user.roleNames).deleteOwn('message').granted;
    if (!args.messageId || (!canDeleteOwn && !canDeleteAny)) throw new BadRequestException('FORBIDDEN');

    const message = await this.messagesRepository.findOne(args.messageId);

    if (!message) throw new BadRequestException('FORBIDDEN');
    if (!canDeleteAny && canDeleteOwn && message.ownerId !== user.id) throw new BadRequestException('FORBIDDEN');

    message.deletedById = user?.id ?? undefined;
    message.deletedAt = new Date();

    return this.messagesRepository.saveAndReturn(message);
  }
}
