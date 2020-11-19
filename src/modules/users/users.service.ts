import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoreThan } from 'typeorm';
import { DateTime } from 'luxon';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@modules/users/entities/users.entity';
import { Utils } from '@common/utils/utils';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  public onlineUsersIds: number[] = [];

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
}
