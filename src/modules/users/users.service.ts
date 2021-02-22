import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoreThan } from 'typeorm';
import { DateTime } from 'luxon';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
import { Utils } from '@common/utils/utils';
import { PunishmentArgs } from '@modules/users/args/punishment.args';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { BadRequestException } from '@common/exceptions/exceptions';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    @InjectRepository(PunishmentsRepository)
    private readonly punishmentsRepository: PunishmentsRepository,
  ) {}

  public onlineUsersIds: number[] = [];

  async getUserById(args: GetUserByIdArgs): Promise<User> {
    const user = await this.usersRepository.findOne(args.id);
    if (!user) throw new BadRequestException('USER_DOES_NOT_EXIST_WITH_ID', args.id.toString());
    return user;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateOnline(): Promise<void> {
    const users = await this.usersRepository.find({
      where: {
        wasOnlineAt: MoreThan(DateTime.utc().minus({ minutes: 2 }).toSQL()),
      },
    });

    const ids = users.map(({ id }) => id);
    const diff = Utils.arrayDiff(this.onlineUsersIds, ids);

    if (diff.length > 0) {
      this.onlineUsersIds = ids;
      await this.pubSub.publish('onlineUpdated', { onlineUpdated: users });
    }
  }

  async getOnline(): Promise<User[]> {
    return this.usersRepository.findByIds(this.onlineUsersIds);
  }

  async updateOnlineStatus(): Promise<void> {
    await this.updateOnline();
  }

  async punish(args: PunishmentArgs, executor: User): Promise<Punishment> {
    await this.usersRepository.isExist(args.userId);
    let punishment = await this.punishmentsRepository.getLastPunishment(args.userId);
    if (punishment) throw new BadRequestException('USER_ALREADY_PUNISHED');
    punishment = this.punishmentsRepository.create({
      targetId: args.userId,
      executorId: executor.id,
      type: args.type,
      reason: args.reason,
      cancelAt: args.cancelAt ? DateTime.fromISO(args.cancelAt).toJSDate() : undefined,
    });
    return this.punishmentsRepository.saveAndReturn(punishment);
  }

  async unpunish(args: UnpunishmentArgs, executor: User): Promise<Punishment> {
    await this.usersRepository.isExist(args.userId);
    const punishment = await this.punishmentsRepository.getLastPunishment(args.userId);
    if (!punishment) throw new BadRequestException('USER_IS_NOT_PUNISHED');
    punishment.canceledAt = new Date();
    punishment.canceledById = executor.id;
    await this.tokensRepository.expireUserTokens(args.userId);

    return this.punishmentsRepository.saveAndReturn(punishment);
  }
}
