import { User } from '@modules/users/entities/users.entity';
import { BasicRepository } from '@common/repositories/basic.repository';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
export declare class UsersRepository extends BasicRepository<User> {
    getUserByEmailOrUsername(email: string | undefined): Promise<User | undefined>;
    getUserByEmailAndUsername(email: string | undefined, username?: string | undefined): Promise<User | undefined>;
    createNewUser(input: SignUpArgs & {
        salt: string;
        hash: string;
    }): Promise<User>;
    userExists(userId: number): Promise<User>;
}
