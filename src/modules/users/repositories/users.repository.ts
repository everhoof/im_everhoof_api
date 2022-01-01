import { EntityRepository, ILike } from 'typeorm';
import { User } from '@modules/users/entities/users.entity';
import { BasicRepository } from '@modules/common/repositories/basic.repository';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';

@EntityRepository(User)
export class UsersRepository extends BasicRepository<User> {
  getUserByEmailOrUsername(email: string | undefined): Promise<User | undefined> {
    if (!email) return Promise.resolve(undefined);

    return this.findOne({
      select: ['id', 'username', 'email', 'salt', 'hash'],
      where: [{ username: ILike(email.toLowerCase()) }, { email: ILike(email.toLowerCase()) }],
    });
  }

  getUserByEmailAndUsername(email: string | undefined, username?: string | undefined): Promise<User | undefined> {
    if (!email) return Promise.resolve(undefined);

    return this.findOne({
      where: [
        { username: username ? ILike(username) : undefined },
        { email: email },
        { username: email },
        { email: username ? ILike(username) : undefined },
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
}
