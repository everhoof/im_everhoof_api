import { Args, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Inject, UseFilters, UseGuards } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import { Loader } from '@intelrug/nestjs-graphql-dataloader';
import DataLoader from 'dataloader';
import { PicturesLoader } from '@modules/pictures/loaders/pictures.loader';
import { MessagesService } from '@modules/messages/messages.service';
import { CreateMessageArgs } from '@modules/messages/args/create-message.args';
import { CurrentUser, GqlAuthGuard, OptionalGqlAuthGuard } from '@common/guards/auth.guard';
import { User } from '@modules/users/entities/users.entity';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { UsersLoader } from '@modules/users/loaders/users.loader';
import { PubSub } from 'graphql-subscriptions';
import { DeleteMessageArgs } from '@modules/messages/args/delete-message.args';
import { ACGuard } from '@common/guards/access-control.guard';
import { RateLimit } from 'nestjs-rate-limiter';

@UseFilters(GraphqlExceptionFilter)
@Resolver(() => Message)
export class MessagesResolver {
  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub, private readonly messagesService: MessagesService) {}

  @ResolveField(() => User, { nullable: true })
  async owner(
    @Parent() message: Message,
    @Loader(UsersLoader)
    usersLoader: DataLoader<User['id'], User>,
  ): Promise<Nullable<User>> {
    if (message.ownerId) {
      return usersLoader.load(message.ownerId);
    }
    return null;
  }

  @ResolveField(() => [Picture])
  async pictures(
    @Parent() message: Message,
    @Loader(PicturesLoader)
    picturesLoader: DataLoader<Picture['id'], Picture>,
  ): Promise<(Picture | Error)[]> {
    return picturesLoader.loadMany(message.pictureIds);
  }

  @ResolveField(() => User, { nullable: true })
  async deletedBy(
    @Parent() message: Message,
    @Loader(UsersLoader)
    usersLoader: DataLoader<User['id'], User>,
  ): Promise<Nullable<User>> {
    if (message.deletedById) {
      return usersLoader.load(message.deletedById);
    }
    return null;
  }

  @UseGuards(GqlAuthGuard)
  @RateLimit({
    points: 5,
    duration: 10,
    maxQueueSize: 5,
  })
  @Mutation(() => Message)
  async createMessage(@Args() args: CreateMessageArgs, @CurrentUser() user: User): Promise<Message> {
    const message = await this.messagesService.createMessage(args, user);
    await this.pubSub.publish('messageCreated', { messageCreated: message });
    return message;
  }

  @UseGuards(OptionalGqlAuthGuard, ACGuard)
  @Query(() => [Message])
  getMessages(@Args() args: GetMessagesArgs, @CurrentUser() user?: User): Promise<Message[]> {
    return this.messagesService.getMessages(args, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async deleteMessage(@Args() args: DeleteMessageArgs, @CurrentUser() user: User): Promise<Message> {
    const message = await this.messagesService.deleteMessage(args, user);
    await this.pubSub.publish('messageDeleted', { messageDeleted: message });
    return message;
  }

  @Subscription(() => Message, {
    name: 'messageCreated',
  })
  messageCreated(): AsyncIterator<Message> {
    return this.pubSub.asyncIterator('messageCreated');
  }

  @Subscription(() => Message, {
    name: 'messageDeleted',
  })
  messageDeleted(): AsyncIterator<Message> {
    return this.pubSub.asyncIterator('messageDeleted');
  }
}
