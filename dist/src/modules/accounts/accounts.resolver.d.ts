import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { ConfirmEmailArgs } from '@modules/accounts/args/confirm-email.args';
import { RequestPasswordResetArgs, ResetPasswordArgs } from '@modules/accounts/args/reset-password.args';
export declare class AccountsResolver {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    signIn(args: SignInArgs): Promise<Token>;
    signUp(args: SignUpArgs): Promise<User>;
    confirmEmail(args: ConfirmEmailArgs): Promise<Token>;
    requestEmailConfirmation(args: SignInArgs): Promise<User>;
    requestPasswordReset(args: RequestPasswordResetArgs): Promise<boolean>;
    resetPassword(args: ResetPasswordArgs): Promise<Token>;
}
