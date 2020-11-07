import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
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
    await this.tokensRepository.save(token);
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
    return this.usersRepository.saveAndReturn(user);
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
