import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { RolesRepository } from '@modules/roles/repositories/roles.repository';
import { Connection } from 'typeorm';
import { ConfirmationsRepository } from '@modules/accounts/repositories/confirmations.repository';
import { RequestPasswordResetArgs, ResetPasswordArgs } from '@modules/accounts/args/reset-password.args';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmEmailArgs } from '@modules/accounts/args/confirm-email.args';
import { OAuthRepository } from '@modules/accounts/repositories/oauth.repository';
import { IsUsernameFreeArgs } from '@modules/accounts/args/is-username-free.args';
import { UpdateUsernameArgs } from '@modules/accounts/args/update-username.args';
import { GetTokenByDiscordIdArgs } from '@modules/accounts/args/get-token-by-discord-id.args';
import { PubSub } from 'graphql-subscriptions';
import { InvalidateTokenByIdArgs } from '@modules/accounts/args/invalidate-token-by-id.args';
export declare class AccountsService {
    private readonly connection;
    private readonly tokensRepository;
    private readonly usersRepository;
    private readonly rolesRepository;
    private readonly oauthRepository;
    private readonly confirmationsRepository;
    private readonly mailerService;
    private readonly pubSub;
    private readonly logger;
    constructor(connection: Connection, tokensRepository: TokensRepository, usersRepository: UsersRepository, rolesRepository: RolesRepository, oauthRepository: OAuthRepository, confirmationsRepository: ConfirmationsRepository, mailerService: MailerService, pubSub: PubSub);
    validateUserByEmailAndPassword(args: SignInArgs): Promise<Token>;
    validateUserByToken(value: string): Promise<Token>;
    validateUserByDiscord(accessToken: string, refreshToken: string, profile: Record<string, unknown>): Promise<Token>;
    createUser(input: SignUpArgs): Promise<User>;
    requestEmailConfirmation(user: User): Promise<User>;
    requestPasswordReset(args: RequestPasswordResetArgs): Promise<boolean>;
    sendConfirmationEmail(args: {
        email: string;
        name: string;
        token: string;
    }): Promise<void>;
    sendPasswordResetEmail(args: {
        email: string;
        name: string;
        token: string;
    }): Promise<void>;
    confirmEmail(args: ConfirmEmailArgs): Promise<Token>;
    resetPassword(args: ResetPasswordArgs): Promise<Token>;
    isUsernameFree(args: IsUsernameFreeArgs): Promise<boolean>;
    updateUsername(args: UpdateUsernameArgs, user: User): Promise<User>;
    getTokenByDiscordId(args: GetTokenByDiscordIdArgs): Promise<Token | undefined>;
    invalidateTokenById(args: InvalidateTokenByIdArgs, user: User): Promise<boolean>;
    invalidateAllTokens(user: User): Promise<boolean>;
    getTokens(user: User): Promise<Token[]>;
    createSaltHash(password: string): {
        salt: string;
        hash: string;
    };
    checkSaltHash(password: string, salt: string, hash: string): boolean;
}