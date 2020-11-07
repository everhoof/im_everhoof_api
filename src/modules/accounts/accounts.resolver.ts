import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Accounts')
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Token)
  async signIn(@Args() args: SignInArgs): Promise<Token> {
    return this.accountsService.validateUserByEmailAndPassword(args);
  }

  @Mutation(() => User)
  async signUp(@Args() args: SignUpArgs): Promise<User> {
    return this.accountsService.createUser(args);
  }
}
