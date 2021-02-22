import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from '@modules/users/users.service';
import { PunishmentArgs } from '@modules/users/args/punishment.args';
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
export declare class UsersResolver {
    private readonly pubSub;
    private readonly usersService;
    constructor(pubSub: PubSub, usersService: UsersService);
    avatar(user: User, picturesLoader: DataLoader<Picture['id'], Picture>): Promise<Nullable<Picture>>;
    getCurrentUser(user: User): Promise<User>;
    getUserById(args: GetUserByIdArgs): Promise<User>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<boolean>;
    punish(args: PunishmentArgs, executor: User): Promise<Punishment>;
    unpunish(args: UnpunishmentArgs, executor: User): Promise<Punishment>;
    onlineUpdated(): AsyncIterator<User[]>;
}
