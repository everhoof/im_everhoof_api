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
import { UnpunishmentArgs } from '@modules/users/args/unpunishment.args';
import { BadRequestException } from '@common/exceptions/exceptions';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';
import { MessagesService } from '@modules/messages/messages.service';
import { UpdateAvatarArgs } from '@modules/users/args/update-avatar.args';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { SubscriptionEvents } from '@modules/common/types/subscription-events';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    @InjectRepository(UsersRepository)
    private readonly users: UsersRepository,
    @InjectRepository(TokensRepository)
    private readonly tokens: TokensRepository,
    @InjectRepository(PunishmentsRepository)
    private readonly punishments: PunishmentsRepository,
    @InjectRepository(PicturesRepository)
    private readonly pictures: PicturesRepository,
    private readonly messagesService: MessagesService,
  ) {}

  public onlineUsersIds: number[] = [];

  async getUserById(args: GetUserByIdArgs): Promise<User> {
    const user = await this.users.findOne(args.id);
    if (!user) throw new BadRequestException('USER_DOES_NOT_EXIST_WITH_ID', args.id.toString());
    return user;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateOnline(): Promise<void> {
    const users = await this.users.find({
      where: {
        wasOnlineAt: MoreThan(DateTime.utc().minus({ minutes: 2 }).toSQL()),
      },
    });

    const ids = users.map(({ id }) => id);
    const diff = Utils.arrayDiff(this.onlineUsersIds, ids);

    if (diff.length > 0) {
      this.onlineUsersIds = ids;
      await this.pubSub.publish(SubscriptionEvents.ONLINE_UPDATED, users);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async unpunishUsers(): Promise<void> {
    const punishments = await this.punishments.find({
      where: {
        cancelAt: LessThanOrEqual(DateTime.utc().toSQL()),
        canceledAt: IsNull(),
      },
    });

    const jobs = punishments.map((punishment) => {
      this.unpunish({ userId: punishment.targetId });
    });
    await Promise.allSettled(jobs);
  }

  async getOnline(): Promise<User[]> {
    return this.users.findByIds(this.onlineUsersIds);
  }

  async updateOnlineStatus(): Promise<void> {
    await this.updateOnline();
  }

  async updateAvatar(args: UpdateAvatarArgs, executor: User): Promise<User> {
    const picture = await this.pictures.isExist(args.pictureId);
    if (picture.ownerId && picture.ownerId !== executor.id) throw new BadRequestException('FORBIDDEN');
    await this.users.update(
      {
        id: executor.id,
      },
      {
        avatarId: picture.id,
      },
    );

    const user = await this.users.isExist(executor.id);
    const message = `${user.username} uploaded a new avatar`;
    await Promise.all([
      this.messagesService.createSystemMessage(message),
      this.pubSub.publish(SubscriptionEvents.USER_UPDATED, user),
    ]);
    return user;
  }

  async punish(args: PunishmentArgs, executor: User): Promise<User> {
    const user = await this.users.isExist(args.userId);
    let punishment = await this.punishments.getLastPunishment(args.userId);
    if (punishment) throw new BadRequestException('USER_ALREADY_PUNISHED');
    const date = args.duration ? DateTime.local().plus({ minutes: args.duration }) : undefined;

    punishment = this.punishments.create({
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
    await Promise.all([this.punishments.save(punishment), this.messagesService.createSystemMessage(content)]);
    await this.pubSub.publish(SubscriptionEvents.USER_UPDATED, user);
    return user;
  }

  async unpunish(args: UnpunishmentArgs, executor?: User): Promise<User> {
    const user = await this.users.isExist(args.userId);
    const punishment = await this.punishments.getLastPunishment(args.userId);
    if (!punishment) throw new BadRequestException('USER_IS_NOT_PUNISHED');
    punishment.canceledAt = new Date();
    if (executor) punishment.canceledById = executor.id;
    // await this.tokensRepository.expireUserTokens(args.userId);

    const content = `${user.username} was ${punishment.type === PunishmentTypes.mute ? 'unmuted' : 'unbanned'}`;

    await Promise.all([this.punishments.save(punishment), this.messagesService.createSystemMessage(content)]);
    await this.pubSub.publish(SubscriptionEvents.USER_UPDATED, user);
    return user;
  }
}
