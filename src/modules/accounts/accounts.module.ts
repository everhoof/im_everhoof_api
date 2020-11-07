import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@modules/users/users.module';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { BearerStrategy } from '@modules/accounts/strategies/bearer.strategy';
import { AccountsResolver } from '@modules/accounts/accounts.resolver';
import { AccountsService } from '@modules/accounts/accounts.service';
import { RolesRepository } from '@modules/roles/repositories/roles.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([TokensRepository, UsersRepository, RolesRepository]),
  ],
  providers: [AccountsService, AccountsResolver, BearerStrategy],
})
export class AccountsModule {}
