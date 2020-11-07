import { Repository } from 'typeorm';
import { Token } from '@modules/accounts/entities/tokens.entity';
export declare class TokensRepository extends Repository<Token> {
    createNewToken(ownerId: number | undefined): Promise<Token | undefined>;
    getTokenByValue(value: string | undefined): Promise<Token | undefined>;
    private createTokenString;
}
