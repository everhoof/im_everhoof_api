import { Inject, Injectable, Logger } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { Token } from '@modules/accounts/entities/tokens.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@modules/common/exceptions/exceptions';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { RolesRepository } from '@modules/roles/repositories/roles.repository';
import { Connection } from 'typeorm';
import { ConfirmationsRepository } from '@modules/accounts/repositories/confirmations.repository';
import { ConfirmationType } from '@modules/accounts/types/confirmation-type.enum';
import { RequestPasswordResetArgs, ResetPasswordArgs } from '@modules/accounts/args/reset-password.args';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmEmailArgs } from '@modules/accounts/args/confirm-email.args';
import { OAuthRepository } from '@modules/accounts/repositories/oauth.repository';
import { OAuthType } from '@modules/accounts/types/oauth-type.enum';
import { IsUsernameFreeArgs } from '@modules/accounts/args/is-username-free.args';
import { UpdateUsernameArgs } from '@modules/accounts/args/update-username.args';
import { GetTokenByDiscordIdArgs } from '@modules/accounts/args/get-token-by-discord-id.args';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionEvents } from '@modules/common/types/subscription-events';
import { InvalidateTokenByIdArgs } from '@modules/accounts/args/invalidate-token-by-id.args';
import { AppRoles } from '../../app.roles';
import { OAuthDiscordArgs } from '@modules/accounts/args/oauth-discord.args';
import { OAuthDiscordTokenResponse } from '@modules/accounts/types/oauth-discord-response';
import { Utils } from '@modules/common/utils/utils';
import got from 'got';
import blacklist from 'the-big-username-blacklist';
import { EmailDisposableResponse } from '@modules/accounts/types/email-disposable-response';
import { DateTime } from 'luxon';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name, true);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
    @InjectRepository(OAuthRepository)
    private readonly oauthRepository: OAuthRepository,
    @InjectRepository(ConfirmationsRepository)
    private readonly confirmationsRepository: ConfirmationsRepository,
    private readonly mailerService: MailerService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  async validateUserByEmailAndPassword(args: SignInArgs): Promise<Token> {
    const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
    if (!user || !user.salt || !user.hash) throw new UnauthorizedException('WRONG_CREDENTIALS');

    const isPasswordValid: boolean = this.checkSaltHash(args.password, user.salt, user.hash);
    if (!isPasswordValid) throw new UnauthorizedException('WRONG_CREDENTIALS');

    const token = await this.tokensRepository.createNewToken(user.id);
    if (!token) throw new InternalServerErrorException('UNKNOWN');
    return token;
  }

  async validateUserByToken(value: string): Promise<Token> {
    const token = await this.tokensRepository.getTokenByValue(value);
    if (!token) throw null;
    token.usedAt = new Date();
    await this.connection.transaction(async (entityManager) => {
      await entityManager.update(
        User,
        {
          id: token.ownerId,
        },
        {
          wasOnlineAt: new Date(),
        },
      );
      await entityManager.save(Token, token);
    });
    return token;
  }

  async getTokenByDiscordCode(args: OAuthDiscordArgs): Promise<Token> {
    if (!process.env.DISCORD_OAUTH_CLIENT_ID || !process.env.DISCORD_OAUTH_CLIENT_SECRET || !process.env.PUBLIC_URL) {
      throw new InternalServerErrorException('UNKNOWN');
    }

    const form = {
      client_id: process.env.DISCORD_OAUTH_CLIENT_ID,
      client_secret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: args.code,
      redirect_uri: process.env.DISCORD_OAUTH_CALLBACK_URL,
    };

    try {
      const { access_token, refresh_token } = await got
        .post(`https://discord.com/api/v${process.env.DISCORD_API_VERSION}/oauth2/token`, {
          form,
        })
        .json<OAuthDiscordTokenResponse>();

      const profile = await got
        .get(`https://discord.com/api/v${process.env.DISCORD_API_VERSION}/users/@me`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .json<Record<string, string>>();

      return this.validateUserByDiscord(access_token, refresh_token, profile);
    } catch (e) {
      throw new InternalServerErrorException('UNKNOWN');
    }
  }

  async validateUserByDiscord(
    accessToken: string,
    refreshToken: string,
    profile: Record<string, unknown>,
  ): Promise<Token> {
    let newUser = false;
    let oauth = await this.oauthRepository.findOne({
      where: { externalId: profile['id'], type: OAuthType.discord },
    });
    if (!oauth) {
      let user;
      if (profile['email']) {
        user = await this.usersRepository.findOne({
          where: { email: profile['email'] as string },
        });
      }
      if (!user) {
        let username = profile['username'] as string;
        user = await this.usersRepository.findOne({
          where: { username: profile['username'] as string },
        });
        if (user) {
          username = Utils.getRandomString(8);
        }

        const role = await this.rolesRepository.getDefaultRole();

        user = this.usersRepository.create({
          email: profile['email'] as string,
          username,
          emailConfirmed: true,
          roles: [role],
        });
        user = await this.usersRepository.save(user);
        newUser = true;
      }
      oauth = this.oauthRepository.create({
        type: OAuthType.discord,
        externalId: profile['id'] as string,
        accessToken,
        refreshToken,
        userId: user.id,
        data: profile,
      });
      oauth = await this.oauthRepository.save(oauth);
    }
    const token = await this.tokensRepository.createNewToken(oauth.userId);
    if (!token) throw new InternalServerErrorException('UNKNOWN');

    if (newUser)
      await this.pubSub.publish(SubscriptionEvents.USER_REGISTERED_VIA_DISCORD, {
        [SubscriptionEvents.USER_REGISTERED_VIA_DISCORD]: oauth.externalId,
      });
    return token;
  }

  async checkEmailForDisposability(email: string): Promise<boolean> {
    const emailDomain = email.split('@')[1];

    try {
      const isInValidEmail = (
        await got
          .get(`https://open.kickbox.com/v1/disposable/${emailDomain}`, { timeout: 5000 })
          .json<EmailDisposableResponse>()
      ).disposable;
      return isInValidEmail;
    } catch {
      this.logger.warn('Unable to connect to kickbox.com');
    }

    return true;
  }

  async createUser(input: SignUpArgs): Promise<User> {
    let user = await this.usersRepository.getUserByEmailAndUsername(input.email, input.username);
    if (user) {
      if (input.username && (input.username === user.username || input.username === user.email)) {
        throw new BadRequestException('USERNAME_OCCUPIED');
      } else {
        throw new BadRequestException('EMAIL_OCCUPIED');
      }
    }

    const isDisposableEmail = await this.checkEmailForDisposability(input.email);

    if (isDisposableEmail) {
      throw new BadRequestException('EMAIL_BLACKLISTED');
    }

    if (!blacklist.validate(input.username)) {
      throw new BadRequestException('USERNAME_BLACKLISTED');
    }

    const { salt, hash } = this.createSaltHash(input.password);
    user = await this.usersRepository.createNewUser({ ...input, salt, hash });
    const role = await this.rolesRepository.getDefaultRole();
    user.roles = [role];

    const result = await Promise.all([
      await this.usersRepository.saveAndReturn(user),
      await this.requestEmailConfirmation(user),
    ]);

    return result[0];
  }

  async requestEmailConfirmation(user: User): Promise<User> {
    if (user.emailConfirmed) throw new BadRequestException('EMAIL_ALREADY_CONFIRMED');

    const confirmation = await this.confirmationsRepository.createNewConfirmation(
      user.id,
      ConfirmationType.registration,
    );
    this.sendConfirmationEmail({
      email: user.email,
      name: user.username || 'user',
      token: confirmation.value,
    }).catch((e) => this.logger.error(e));
    return user;
  }

  async requestPasswordReset(args: RequestPasswordResetArgs): Promise<boolean> {
    const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
    if (!user) return true;

    let confirmation = await this.confirmationsRepository.findOnePasswordResetByUserId(user.id);

    if (!confirmation) {
      confirmation = await this.confirmationsRepository.createNewConfirmation(user.id, ConfirmationType.password);
    }

    const rateLimitEndAt = DateTime.fromJSDate(confirmation.updatedAt).plus({ days: 1 }).toMillis();
    if (confirmation.sendCount % 3 == 0 && rateLimitEndAt > Date.now() && confirmation.sendCount !== 0) {
      throw new BadRequestException('RESET_PASSWORD_RATE_LIMIT_HIT');
    }

    this.sendPasswordResetEmail({
      email: user.email,
      name: user.username || 'user',
      token: confirmation.value,
    }).catch((e) => this.logger.error(e));

    confirmation.sendCount += 1;
    await this.confirmationsRepository.save(confirmation);

    return true;
  }

  async sendConfirmationEmail(args: { email: string; name: string; token: string }): Promise<void> {
    await this.mailerService.sendMail({
      to: args.email,
      subject: 'Подтверждение E-mail',
      template: 'confirm-email',
      context: {
        email: args.email,
        name: args.name,
        link: `${process.env.PUBLIC_URL}/confirm_email?code=${args.token}`,
      },
    });
  }

  async sendPasswordResetEmail(args: { email: string; name: string; token: string }): Promise<void> {
    await this.mailerService.sendMail({
      to: args.email,
      subject: 'Сброс пароля',
      template: 'reset-password',
      context: {
        email: args.email,
        name: args.name,
        link: `${process.env.PUBLIC_URL}/reset_password?code=${args.token}`,
      },
    });
  }

  async confirmEmail(args: ConfirmEmailArgs): Promise<Token> {
    const confirmation = await this.confirmationsRepository.getConfirmationByValue(args.token);
    if (!confirmation) throw new BadRequestException('CONFIRMATION_IS_INVALID');

    const user = await this.usersRepository.findOne(confirmation.userId);
    if (!user) throw new BadRequestException('CONFIRMATION_IS_INVALID');

    await this.confirmationsRepository.delete(confirmation.id);
    user.emailConfirmed = true;
    await this.usersRepository.saveAndReturn(user);

    const token = await this.tokensRepository.createNewToken(user.id);
    if (!token) throw new InternalServerErrorException('UNKNOWN');

    return token;
  }

  async resetPassword(args: ResetPasswordArgs): Promise<Token> {
    const confirmation = await this.confirmationsRepository.getConfirmationByValue(args.token);
    if (!confirmation) throw new BadRequestException('CONFIRMATION_IS_INVALID');

    const user = await this.usersRepository.findOne(confirmation.userId);
    if (!user) throw new BadRequestException('CONFIRMATION_IS_INVALID');

    const { salt, hash } = this.createSaltHash(args.password);
    user.salt = salt;
    user.hash = hash;
    await Promise.all([
      this.confirmationsRepository.delete(confirmation.id),
      this.usersRepository.save(user),
      this.tokensRepository.expireUserTokens(user.id),
    ]);

    const token = await this.tokensRepository.createNewToken(user.id);
    if (!token) throw new InternalServerErrorException('UNKNOWN');

    return token;
  }

  async isUsernameFree(args: IsUsernameFreeArgs): Promise<boolean> {
    return !(await this.usersRepository.findOne({ where: { username: args.username } }));
  }

  async updateUsername(args: UpdateUsernameArgs, user: User): Promise<User> {
    const free = await this.isUsernameFree({ username: args.username });
    if (!free) throw new BadRequestException('USERNAME_OCCUPIED');

    await this.usersRepository.update({ id: user.id }, { username: args.username });
    return this.usersRepository.isExist(user.id);
  }

  async getTokenByDiscordId(args: GetTokenByDiscordIdArgs): Promise<Token | undefined> {
    const oauth = await this.oauthRepository.findOne({ where: { externalId: args.id, type: OAuthType.discord } });
    if (!oauth) return;
    return this.tokensRepository.createNewToken(oauth.userId);
  }

  async invalidateTokenById(args: InvalidateTokenByIdArgs, user: User): Promise<boolean> {
    const token = await this.tokensRepository.isExist(args.id);
    if (token.ownerId !== user.id && !user.roleNames.includes(AppRoles.ADMIN))
      throw new BadRequestException('FORBIDDEN');
    await this.tokensRepository.delete(token.id);
    return true;
  }

  async invalidateTokenByValue(value: string): Promise<boolean> {
    const token = await this.tokensRepository.findOne({ where: { value } });
    if (!token) throw new BadRequestException('FORBIDDEN');
    await this.tokensRepository.delete(token.id);
    return true;
  }

  async invalidateAllTokens(user: User): Promise<boolean> {
    await this.tokensRepository.delete({ ownerId: user.id });
    return true;
  }

  async getTokens(user: User): Promise<Token[]> {
    return this.tokensRepository.find({ where: { ownerId: user.id } });
  }

  createSaltHash(password: string): { salt: string; hash: string } {
    const salt = randomBytes(48).toString('base64');
    const hash = pbkdf2Sync(password, salt, 10, 48, 'sha512').toString('base64');
    return { salt, hash };
  }

  checkSaltHash(password: string, salt: string, hash: string): boolean {
    if (!password || !hash || !salt) return false;
    const userHash = pbkdf2Sync(password, salt, 10, 48, 'sha512').toString('base64');
    return userHash === hash;
  }
}
