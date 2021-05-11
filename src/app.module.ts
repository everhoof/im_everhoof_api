import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmConfigService } from '@config/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '@modules/users/users.module';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { RolesModule } from '@modules/roles/roles.module';
import { AppResolver } from './app.resolver';
import { PicturesModule } from '@modules/pictures/pictures.module';
import { MessagesModule } from '@modules/messages/messages.module';
import { UploadModule } from '@modules/upload/upload.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@intelrug/nestjs-graphql-dataloader';
import { CommonModule } from '@modules/common/common.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), './graphql/schema.graphql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        onConnect: (connectionParams: { [key: string]: any }, websocket: { [key: string]: any }) => {
          return {
            headers: {
              ...(websocket?.upgradeReq?.headers || {}),
              authorization: connectionParams?.['Authorization'] || undefined,
            },
          };
        },
      },
      context: ({ req, connection }) => ({
        req: connection?.context || req,
        connection,
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRoot({
      transport: process.env.EMAIL_TRANSPORT,
      defaults: {
        from: `${process.env.EMAIL_DISPLAY_NAME} <${process.env.EMAIL_DISPLAY_EMAIL}>`,
      },
      template: {
        dir: process.cwd() + '/mail/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    RateLimiterModule.register({
      for: 'ExpressGraphql',
      points: +(process.env.RATE_LIMIT_POINTS || '15'),
      duration: +(process.env.RATE_LIMIT_DURATION || '5'),
      queueEnabled: (process.env.QUEUE_ENABLED || 'true') === 'true',
      maxQueueSize: +(process.env.QUEUE_SIZE || '10'),
    }),
    AccessControlModule.forRoles(roles),
    ScheduleModule.forRoot(),
    CommonModule,
    UsersModule,
    AccountsModule,
    RolesModule,
    PicturesModule,
    MessagesModule,
    UploadModule,
  ],
  providers: [
    AppResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export class AppModule {}
