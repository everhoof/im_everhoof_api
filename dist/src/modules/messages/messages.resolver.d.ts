import { Picture } from '@modules/pictures/entities/pictures.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import DataLoader from 'dataloader';
import { MessagesService } from '@modules/messages/messages.service';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { User } from '@modules/users/entities/users.entity';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
export declare class MessagesResolver {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    owner(message: Message, usersLoader: DataLoader<User['id'], User>): Promise<Nullable<User>>;
    pictures(message: Message, picturesLoader: DataLoader<Picture['id'], Picture>): Promise<(Picture | Error)[]>;
    createMessage(args: CreateMessageArgs, user: User): Promise<Message>;
    getMessages(args: GetMessagesArgs): Promise<Message[]>;
}
