import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from '@modules/users/users.service';
export declare class UsersResolver {
    private readonly pubSub;
    private readonly usersService;
    constructor(pubSub: PubSub, usersService: UsersService);
    avatar(user: User, picturesLoader: DataLoader<Picture['id'], Picture>): Promise<Nullable<Picture>>;
    getCurrentUser(user: User): Promise<User>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<boolean>;
    onlineUpdated(): AsyncIterator<User[]>;
}
