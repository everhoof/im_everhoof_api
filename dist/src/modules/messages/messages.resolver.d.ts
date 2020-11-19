import { Picture } from '@modules/pictures/entities/pictures.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import DataLoader from 'dataloader';
import { MessagesService } from '@modules/messages/messages.service';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { User } from '@modules/users/entities/users.entity';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { PubSub } from 'graphql-subscriptions';
export declare class MessagesResolver {
    private readonly pubSub;
    private readonly messagesService;
    constructor(pubSub: PubSub, messagesService: MessagesService);
    owner(message: Message, usersLoader: DataLoader<User['id'], User>): Promise<Nullable<User>>;
    pictures(message: Message, picturesLoader: DataLoader<Picture['id'], Picture>): Promise<(Picture | Error)[]>;
    createMessage(args: CreateMessageArgs, user: User): Promise<Message>;
    getMessages(args: GetMessagesArgs): Promise<Message[]>;
    messageCreated(): AsyncIterator<Message>;
}
