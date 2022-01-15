import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        const eventEmitter = new EventEmitter();
        eventEmitter.setMaxListeners(200);
        return new PubSub({ eventEmitter });
      },
    },
  ],
  exports: ['PUB_SUB'],
})
export class CommonModule {}
