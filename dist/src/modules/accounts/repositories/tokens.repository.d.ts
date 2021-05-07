import { Token } from '@modules/accounts/entities/tokens.entity';
import { BasicRepository } from '@common/repositories/basic.repository';
export declare class TokensRepository extends BasicRepository<Token> {
    createNewToken(ownerId: number | undefined): Promise<Token | undefined>;
    getTokenByValue(value: string | undefined): Promise<Token | undefined>;
    private createTokenString;
    expireUserTokens(ownerId: number): Promise<void>;
}
