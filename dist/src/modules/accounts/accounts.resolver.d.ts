import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { SignInArgs } from '@modules/accounts/args/sign-in.args';
import { User } from '@modules/users/entities/users.entity';
import { SignUpArgs } from '@modules/accounts/args/sign-up.args';
export declare class AccountsResolver {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    signIn(args: SignInArgs): Promise<Token>;
    signUp(args: SignUpArgs): Promise<User>;
}
