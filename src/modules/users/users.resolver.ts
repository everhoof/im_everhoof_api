import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { User } from '@modules/users/entities/users.entity';
import { CurrentUser, GqlAuthGuard } from '@common/guards/auth.guard';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { PicturesLoader } from '@modules/pictures/loaders/pictures.loader';
import { Loader } from '@intelrug/nestjs-graphql-dataloader';
import DataLoader from 'dataloader';

@UseFilters(HttpExceptionFilter)
@Resolver(() => User)
export class UsersResolver {
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
}
