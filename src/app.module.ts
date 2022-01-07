import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
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
import { TypeOrmConfigService } from '@modules/common/typeorm';
import { ConfigModule } from '@modules/config';

@Module({
  imports: [
    ConfigModule,
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
      context: ({ req, res, connection }) => ({
        req: connection?.context || req,
        res,
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
    // ThrottlerModule.forRoot(),
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
  ],
})
export class AppModule {}
