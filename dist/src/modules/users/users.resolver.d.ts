import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from '@modules/users/users.service';
import { PunishmentArgs } from '@modules/users/args/punishment.args';
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
import { UpdateAvatarArgs } from '@modules/users/args/update-avatar.args';
export declare class UsersResolver {
    private readonly pubSub;
    private readonly usersService;
    constructor(pubSub: PubSub, usersService: UsersService);
    avatar(user: User, picturesLoader: DataLoader<Picture['id'], Picture>): Promise<Nullable<Picture>>;
    getCurrentUser(user: User): Promise<User>;
    emailConfirmed(parent: User, user?: User): Promise<boolean | null>;
    muted(parent: User, punishmentsLoader: DataLoader<{
        targetId: Punishment['targetId'];
        type: Punishment['type'];
    }, Punishment>, user?: User): Promise<boolean | null>;
    getUserById(args: GetUserByIdArgs): Promise<User>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<boolean>;
    updateAvatar(args: UpdateAvatarArgs, executor: User): Promise<User>;
    punish(args: PunishmentArgs, executor: User): Promise<User>;
    unpunish(args: UnpunishmentArgs, executor: User): Promise<User>;
    onlineUpdated(): AsyncIterator<User[]>;
    userUpdated(): AsyncIterator<User>;
}
