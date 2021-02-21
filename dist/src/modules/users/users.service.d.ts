import { UsersRepository } from '@modules/users/repositories/users.repository';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
export declare class UsersService {
    private readonly pubSub;
    private readonly usersRepository;
    constructor(pubSub: PubSub, usersRepository: UsersRepository);
    onlineUsersIds: number[];
    getUserById(args: GetUserByIdArgs): Promise<User>;
    updateOnline(): Promise<void>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<void>;
}
