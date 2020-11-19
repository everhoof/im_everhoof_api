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
import { CurrentUser, GqlAuthGuard } from '@common/guards/auth.guard';
import { User } from '@modules/users/entities/users.entity';
import { GetMessagesArgs } from '@modules/messages/args/get-messages.args';
import { UsersLoader } from '@modules/users/loaders/users.loader';
import { PubSub } from 'graphql-subscriptions';

@UseFilters(GraphqlExceptionFilter)
@Resolver(() => Message)
export class MessagesResolver {
  constructor(@Inject('PUB_SUB') private readonly pubSub: PubSub, private readonly messagesService: MessagesService) {}

  @ResolveField(() => User)
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async createMessage(@Args() args: CreateMessageArgs, @CurrentUser() user: User): Promise<Message> {
    const message = await this.messagesService.createMessage(args, user);
    await this.pubSub.publish('messageCreated', { messageCreated: message });
    return message;
  }

  @Query(() => [Message])
  getMessages(@Args() args: GetMessagesArgs): Promise<Message[]> {
    return this.messagesService.getMessages(args);
  }

  @Subscription(() => Message, {
    name: 'messageCreated',
  })
  messageCreated(): AsyncIterator<Message> {
    return this.pubSub.asyncIterator('messageCreated');
  }
}
