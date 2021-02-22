import { UsersRepository } from '@modules/users/repositories/users.repository';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
import { PunishmentArgs } from '@modules/users/args/punishment.args';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
export declare class UsersService {
    private readonly pubSub;
    private readonly usersRepository;
    private readonly tokensRepository;
    private readonly punishmentsRepository;
    constructor(pubSub: PubSub, usersRepository: UsersRepository, tokensRepository: TokensRepository, punishmentsRepository: PunishmentsRepository);
    onlineUsersIds: number[];
    getUserById(args: GetUserByIdArgs): Promise<User>;
    updateOnline(): Promise<void>;
    getOnline(): Promise<User[]>;
    updateOnlineStatus(): Promise<void>;
    punish(args: PunishmentArgs, executor: User): Promise<Punishment>;
    unpunish(args: UnpunishmentArgs, executor: User): Promise<Punishment>;
}
