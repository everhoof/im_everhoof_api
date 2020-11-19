import { UsersRepository } from '@modules/users/repositories/users.repository';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
export declare class UsersService {
    private readonly pubSub;
    private readonly usersRepository;
    constructor(pubSub: PubSub, usersRepository: UsersRepository);
    onlineUsersIds: number[];
    updateOnline(): Promise<void>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<void>;
}
