import { Injectable, Scope } from '@nestjs/common';
import { OrderedNestDataLoader } from '@intelrug/nestjs-graphql-dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';

@Injectable({ scope: Scope.REQUEST })
export class UsersLoader extends OrderedNestDataLoader<User['id'], User> {
  constructor(@InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getOptions = () => ({
    query: (keys: Array<User['id']>) => this.usersRepository.findByIds(keys),
  });
}
