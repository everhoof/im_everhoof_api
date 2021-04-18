import { Injectable, Logger } from '@nestjs/common';
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
} from '@common/exceptions/exceptions';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { RolesRepository } from '@modules/roles/repositories/roles.repository';
import { Connection } from 'typeorm';
import { ConfirmationsRepository } from '@modules/accounts/repositories/confirmations.repository';
import { ConfirmationType } from '@modules/accounts/types/confirmation-type.enum';
import { RequestPasswordResetArgs, ResetPasswordArgs } from '@modules/accounts/args/reset-password.args';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmEmailArgs } from '@modules/accounts/args/confirm-email.args';

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
    @InjectRepository(ConfirmationsRepository)
    private readonly confirmationsRepository: ConfirmationsRepository,
    private readonly mailerService: MailerService,
  ) {}

  async validateUserByEmailAndPassword(args: SignInArgs): Promise<Token> {
    const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
    if (!user) throw new UnauthorizedException('WRONG_CREDENTIALS');

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

  async createUser(input: SignUpArgs): Promise<User> {
    let user = await this.usersRepository.getUserByEmailAndUsername(input.email, input.username);
    if (user) {
      if (input.username && (input.username === user.username || input.username === user.email)) {
        throw new BadRequestException('USERNAME_OCCUPIED');
      } else {
        throw new BadRequestException('EMAIL_OCCUPIED');
      }
    }

    const { salt, hash } = this.createSaltHash(input.password);
    user = await this.usersRepository.createNewUser({ ...input, salt, hash });
    const role = await this.rolesRepository.getDefaultRole();
    user.roles = [role];

    const result = await Promise.all([
      await this.usersRepository.saveAndReturn(user),
      await this.requestEmailConfirmation({ email: input.email, password: input.password }),
    ]);
    return result[0];
  }

  async requestEmailConfirmation(args: SignInArgs): Promise<User> {
    const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
    if (!user) throw new BadRequestException('WRONG_CREDENTIALS');

    const isPasswordValid: boolean = this.checkSaltHash(args.password, user.salt, user.hash);
    if (!isPasswordValid) throw new BadRequestException('WRONG_CREDENTIALS');

    if (user.emailConfirmed) throw new BadRequestException('EMAIL_ALREADY_CONFIRMED');

    const confirmation = await this.confirmationsRepository.createNewConfirmation(
      user.id,
      ConfirmationType.registration,
    );
    this.sendConfirmationEmail({
      email: user.email,
      name: user.username,
      token: confirmation.value,
    }).catch((e) => this.logger.error(e));
    return user;
  }

  async requestPasswordReset(args: RequestPasswordResetArgs): Promise<boolean> {
    const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
    if (!user) return true;

    const confirmation = await this.confirmationsRepository.createNewConfirmation(user.id, ConfirmationType.password);
    this.sendPasswordResetEmail({
      email: user.email,
      name: user.username,
      token: confirmation.value,
    }).catch((e) => this.logger.error(e));
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
