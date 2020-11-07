import { EntityRepository } from 'typeorm';
import { User } from '@modules/users/entities/users.entity';
import { BasicRepository } from '@common/repositories/basic.repository';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { BadRequestException } from '@common/exceptions/exceptions';

@EntityRepository(User)
export class UsersRepository extends BasicRepository<User> {
  getUserByEmailOrUsername(email: string | undefined): Promise<User | undefined> {
    if (!email) return Promise.resolve(undefined);

    return this.findOne({
      select: ['id', 'username', 'email', 'salt', 'hash'],
      where: [{ username: email.toLowerCase() }, { email: email.toLowerCase() }],
    });
  }

  getUserByEmailAndUsername(email: string | undefined, username?: string | undefined): Promise<User | undefined> {
    if (!email) return Promise.resolve(undefined);

    return this.findOne({
      where: [
        { username: username ? username : undefined },
        { email: email },
        { username: email },
        { email: username ? username : undefined },
      ],
    });
  }

  async createNewUser(input: SignUpArgs & { salt: string; hash: string }): Promise<User> {
    const user: User | undefined = this.create({
      email: input.email,
      username: input.username || undefined,
      salt: input.salt,
      hash: input.hash,
    });
    return this.saveAndReturn(user);
  }

  async userExists(userId: number): Promise<User> {
    const user = await this.findOne(userId);
    if (user) return user;
    else throw new BadRequestException('USER_DOES_NOT_EXIST_WITH_ID', userId.toString());
  }
}
