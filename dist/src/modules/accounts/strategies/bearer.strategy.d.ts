import { Strategy } from 'passport-http-bearer';
import { AccountsService } from '@modules/accounts/accounts.service';
import { User } from '@modules/users/entities/users.entity';
declare const BearerStrategy_base: new (...args: any[]) => Strategy<import("passport-http-bearer").VerifyFunctions>;
export declare class BearerStrategy extends BearerStrategy_base {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    validate(token: string): Promise<User>;
}
export {};
