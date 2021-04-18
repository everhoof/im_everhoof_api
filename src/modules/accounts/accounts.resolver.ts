import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { ConfirmEmailArgs } from '@modules/accounts/args/confirm-email.args';
import { RequestPasswordResetArgs, ResetPasswordArgs } from '@modules/accounts/args/reset-password.args';

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

  @Mutation(() => Token)
  async confirmEmail(@Args() args: ConfirmEmailArgs): Promise<Token> {
    return this.accountsService.confirmEmail(args);
  }

  @Mutation(() => User)
  async requestEmailConfirmation(@Args() args: SignInArgs): Promise<User> {
    return this.accountsService.requestEmailConfirmation(args);
  }

  @Mutation(() => Boolean)
  async requestPasswordReset(@Args() args: RequestPasswordResetArgs): Promise<boolean> {
    return this.accountsService.requestPasswordReset(args);
  }

  @Mutation(() => Token)
  async resetPassword(@Args() args: ResetPasswordArgs): Promise<Token> {
    return this.accountsService.resetPassword(args);
  }
}
