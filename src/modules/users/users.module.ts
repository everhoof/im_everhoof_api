import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { UsersService } from '@modules/users/users.service';
import { UsersResolver } from '@modules/users/users.resolver';
import { UsersLoader } from '@modules/users/loaders/users.loader';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, TokensRepository, PunishmentsRepository])],
  providers: [UsersService, UsersResolver, UsersLoader],
})
export class UsersModule {}
