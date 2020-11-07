import { MessagesRepository } from '@modules/messages/repositories/messages.repository';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { Message } from '@modules/messages/entities/messages.entity';
import { User } from '@modules/users/entities/users.entity';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
export declare class MessagesService {
    private readonly messagesRepository;
    private readonly picturesRepository;
    constructor(messagesRepository: MessagesRepository, picturesRepository: PicturesRepository);
    createMessage(args: CreateMessageArgs, user: User): Promise<Message>;
    getMessages(args: GetMessagesArgs): Promise<Message[]>;
}
