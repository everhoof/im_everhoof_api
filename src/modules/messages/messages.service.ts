import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from '@modules/messages/repositories/messages.repository';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { Message } from '@modules/messages/entities/messages.entity';
import { User } from '@modules/users/entities/users.entity';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { BadRequestException } from '@common/exceptions/exceptions';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository)
    private readonly messagesRepository: MessagesRepository,
    @InjectRepository(PicturesRepository)
    private readonly picturesRepository: PicturesRepository,
  ) {}

  async createMessage(args: CreateMessageArgs, user: User): Promise<Message> {
    if (!args.content?.trim() && args.pictures.length === 0)
      throw new BadRequestException('CANNOT_CREATE_EMPTY_MESSAGE');
    const message = this.messagesRepository.create({
      content: args.content?.trim(),
      ownerId: user.id,
      username: user.username,
    });
    message.pictures = args.pictures.map((id) => this.picturesRepository.create({ id }));
    return this.messagesRepository.save(message);
  }

  async getMessages(args: GetMessagesArgs): Promise<Message[]> {
    return this.messagesRepository.getList(args);
  }
}
