import { Strategy } from 'passport-discord';
import { AccountsService } from '@modules/accounts/accounts.service';
import { Token } from '@modules/accounts/entities/tokens.entity';
declare const DiscordStrategy_base: new (...args: any[]) => Strategy;
export declare class DiscordStrategy extends DiscordStrategy_base {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    validate(accessToken: string, refreshToken: string, profile: Record<string, unknown>): Promise<Token>;
}
export {};
