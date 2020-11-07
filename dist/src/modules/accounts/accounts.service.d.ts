import { TokensRepository } from '@modules/accounts/repositories/tokens.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
import { RolesRepository } from '@modules/roles/repositories/roles.repository';
export declare class AccountsService {
    private readonly tokensRepository;
    private readonly usersRepository;
    private readonly rolesRepository;
    constructor(tokensRepository: TokensRepository, usersRepository: UsersRepository, rolesRepository: RolesRepository);
    validateUserByEmailAndPassword(args: SignInArgs): Promise<Token>;
    validateUserByToken(value: string): Promise<Token>;
    createUser(input: SignUpArgs): Promise<User>;
    createSaltHash(password: string): {
        salt: string;
        hash: string;
    };
    checkSaltHash(password: string, salt: string, hash: string): boolean;
}
