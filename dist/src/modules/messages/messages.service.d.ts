import { MessagesRepository } from '@modules/messages/repositories/messages.repository';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { Message } from '@modules/messages/entities/messages.entity';
import { User } from '@modules/users/entities/users.entity';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { PubSub } from 'graphql-subscriptions';
import { UploadService } from '@modules/upload/upload.service';
export declare class MessagesService {
    private readonly pubSub;
    private readonly messagesRepository;
    private readonly picturesRepository;
    private readonly uploadService;
    constructor(pubSub: PubSub, messagesRepository: MessagesRepository, picturesRepository: PicturesRepository, uploadService: UploadService);
    createMessage(args: CreateMessageArgs, user: User): Promise<Message>;
    private uploadImagesFromMessage;
    getMessages(args: GetMessagesArgs): Promise<Message[]>;
}
