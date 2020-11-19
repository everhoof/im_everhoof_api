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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      debug: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), './graphql/schema.graphql'),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
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
  ],
})
export class AppModule {}
