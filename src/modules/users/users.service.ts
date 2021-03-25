import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IsNull, LessThanOrEqual, MoreThan } from 'typeorm';
import { DateTime } from 'luxon';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
import { Utils } from '@common/utils/utils';
import { PunishmentArgs, PunishmentTypes } from '@modules/users/args/punishment.args';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { BadRequestException } from '@common/exceptions/exceptions';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
import { MessagesService } from '@modules/messages/messages.service';

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
    private readonly messagesService: MessagesService,
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

  @Cron(CronExpression.EVERY_MINUTE)
  async unpunishUsers(): Promise<void> {
    const punishments = await this.punishmentsRepository.find({
      where: {
        cancelAt: LessThanOrEqual(DateTime.utc().toSQL()),
        canceledAt: IsNull(),
      },
    });

    const jobs = punishments.map(async (punishment) => {
      await this.unpunish({ userId: punishment.targetId });
    });
    await Promise.allSettled(jobs);
  }

  async getOnline(): Promise<User[]> {
    return this.usersRepository.findByIds(this.onlineUsersIds);
  }

  async updateOnlineStatus(): Promise<void> {
    await this.updateOnline();
  }

  async punish(args: PunishmentArgs, executor: User): Promise<Punishment> {
    const user = await this.usersRepository.isExist(args.userId);
    let punishment = await this.punishmentsRepository.getLastPunishment(args.userId);
    if (punishment) throw new BadRequestException('USER_ALREADY_PUNISHED');
    const date = args.duration ? DateTime.local().plus({ minutes: args.duration }) : undefined;

    punishment = this.punishmentsRepository.create({
      targetId: args.userId,
      executorId: executor.id,
      type: args.type,
      reason: args.reason,
      cancelAt: date?.toJSDate(),
    });

    const content = args.duration
      ? `${user.username} was ${args.type === PunishmentTypes.mute ? 'muted' : 'banned'} for ${
          args.duration
        } minutes with reason: ${args.reason}`
      : `${user.username} was ${args.type === PunishmentTypes.mute ? 'muted' : 'banned'} forever with reason: ${
          args.reason
        }`;
    await this.messagesService.createSystemMessage(content);
    punishment = await this.punishmentsRepository.saveAndReturn(punishment);
    return punishment;
  }

  async unpunish(args: UnpunishmentArgs, executor?: User): Promise<Punishment> {
    const user = await this.usersRepository.isExist(args.userId);
    let punishment = await this.punishmentsRepository.getLastPunishment(args.userId);
    if (!punishment) throw new BadRequestException('USER_IS_NOT_PUNISHED');
    punishment.canceledAt = new Date();
    if (executor) punishment.canceledById = executor.id;
    // await this.tokensRepository.expireUserTokens(args.userId);

    const content = `${user.username} was ${punishment.type === PunishmentTypes.mute ? 'unmuted' : 'unbanned'}`;
    await this.messagesService.createSystemMessage(content);
    punishment = await this.punishmentsRepository.saveAndReturn(punishment);
    return punishment;
  }
}
