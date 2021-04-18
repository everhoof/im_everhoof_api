import { UsersRepository } from '@modules/users/repositories/users.repository';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
import { PunishmentArgs } from '@modules/users/args/punishment.args';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
import { MessagesService } from '@modules/messages/messages.service';
import { UpdateAvatarArgs } from '@modules/users/args/update-avatar.args';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
export declare class UsersService {
    private readonly pubSub;
    private readonly users;
    private readonly tokens;
    private readonly punishments;
    private readonly pictures;
    private readonly messagesService;
    constructor(pubSub: PubSub, users: UsersRepository, tokens: TokensRepository, punishments: PunishmentsRepository, pictures: PicturesRepository, messagesService: MessagesService);
    onlineUsersIds: number[];
    getUserById(args: GetUserByIdArgs): Promise<User>;
    updateOnline(): Promise<void>;
    unpunishUsers(): Promise<void>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<void>;
    updateAvatar(args: UpdateAvatarArgs, executor: User): Promise<User>;
    punish(args: PunishmentArgs, executor: User): Promise<User>;
    unpunish(args: UnpunishmentArgs, executor?: User): Promise<User>;
}
