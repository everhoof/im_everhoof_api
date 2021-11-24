import { MessagesRepository } from '@modules/messages/repositories/messages.repository';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { Message } from '@modules/messages/entities/messages.entity';
import { User } from '@modules/users/entities/users.entity';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { PubSub } from 'graphql-subscriptions';
import { UploadService } from '@modules/upload/upload.service';
import { DeleteMessageArgs } from '@modules/messages/args/delete-message.args';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { UpdateMessageArgs } from './args/update-message.args';
export declare class MessagesService {
    private readonly pubSub;
    private readonly messagesRepository;
    private readonly picturesRepository;
    private readonly punishmentsRepository;
    private readonly uploadService;
    private static EMBED_UPLOAD_IMAGE_MAX_SIZE;
    constructor(pubSub: PubSub, messagesRepository: MessagesRepository, picturesRepository: PicturesRepository, punishmentsRepository: PunishmentsRepository, uploadService: UploadService);
    throwOnPunished(targetId: number): Promise<void>;
    createMessage(args: CreateMessageArgs, user: User): Promise<Message>;
    updateMessage(args: UpdateMessageArgs, user: User): Promise<Message>;
    createSystemMessage(content: string): Promise<Message>;
    private uploadImagesFromMessage;
    getMessages(args: GetMessagesArgs, user?: User): Promise<Message[]>;
    deleteMessage(args: DeleteMessageArgs, user: User): Promise<Message>;
}
