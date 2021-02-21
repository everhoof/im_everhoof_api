import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Inject, UseFilters, UseGuards } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { User } from '@modules/users/entities/users.entity';
import { CurrentUser, GqlAuthGuard } from '@common/guards/auth.guard';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { PicturesLoader } from '@modules/pictures/loaders/pictures.loader';
import { Loader } from '@intelrug/nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from '@modules/users/users.service';
import { GetUserByIdArgs } from '@modules/users/args/get-user-by-id.args';

@UseFilters(GraphqlExceptionFilter)
@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub, private readonly usersService: UsersService) {}

  @ResolveField(() => Picture, { nullable: true })
  async avatar(
    @Parent() user: User,
    @Loader(PicturesLoader)
    picturesLoader: DataLoader<Picture['id'], Picture>,
  ): Promise<Nullable<Picture>> {
    if (user.avatarId) {
      return picturesLoader.load(user.avatarId);
    }
    return null;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => User)
  async getUserById(@Args() args: GetUserByIdArgs): Promise<User> {
    return this.usersService.getUserById(args);
  }

  @Query(() => [User])
  async getOnline(): Promise<User[]> {
    return this.usersService.getOnline();
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateOnlineStatus(): Promise<boolean> {
    await this.usersService.updateOnlineStatus();
    return true;
  }

  @Subscription(() => [User], {
    name: 'onlineUpdated',
  })
  onlineUpdated(): AsyncIterator<User[]> {
    return this.pubSub.asyncIterator('onlineUpdated');
  }
}
