import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { ConfirmEmailArgs } from '@modules/accounts/args/confirm-email.args';
import { RequestPasswordResetArgs, ResetPasswordArgs } from '@modules/accounts/args/reset-password.args';
import { IsUsernameFreeArgs } from '@modules/accounts/args/is-username-free.args';
import { UpdateUsernameArgs } from '@modules/accounts/args/update-username.args';
import { PubSub } from 'graphql-subscriptions';
import { GetTokenByDiscordIdArgs } from '@modules/accounts/args/get-token-by-discord-id.args';
export declare class AccountsResolver {
    private readonly pubSub;
    private readonly accountsService;
    constructor(pubSub: PubSub, accountsService: AccountsService);
    signIn(args: SignInArgs): Promise<Token>;
    signUp(args: SignUpArgs): Promise<User>;
    confirmEmail(args: ConfirmEmailArgs): Promise<Token>;
    requestEmailConfirmation(user: User): Promise<User>;
    requestPasswordReset(args: RequestPasswordResetArgs): Promise<boolean>;
    resetPassword(args: ResetPasswordArgs): Promise<Token>;
    updateUsername(args: UpdateUsernameArgs, user: User): Promise<User>;
    isUsernameFree(args: IsUsernameFreeArgs): Promise<boolean>;
    getTokenByDiscordId(args: GetTokenByDiscordIdArgs, user: User): Promise<Token | undefined>;
    userRegisteredViaDiscord(): AsyncIterator<string>;
}
