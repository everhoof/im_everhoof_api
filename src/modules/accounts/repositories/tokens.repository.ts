import { EntityRepository, Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { Token } from '@modules/accounts/entities/tokens.entity';

@EntityRepository(Token)
export class TokensRepository extends Repository<Token> {
  async createNewToken(ownerId: number | undefined): Promise<Token | undefined> {
    if (!ownerId) return Promise.resolve(undefined);

    const tokenString = await this.createTokenString();
    let tokenEntity: Token | undefined = this.create({
      value: tokenString,
      ownerId: ownerId,
    });
    tokenEntity = await this.save(tokenEntity);
    tokenEntity = await this.findOne(tokenEntity.id);
    return tokenEntity;
  }

  getTokenByValue(value: string | undefined): Promise<Token | undefined> {
    if (!value) return Promise.resolve(undefined);
    return this.findOne({ relations: ['owner', 'owner.roles'], where: { value } });
  }

  private async createTokenString(): Promise<string> {
    const buffer = randomBytes(48);
    const newToken = buffer.toString('base64');
    const accessToken = await this.findOne({ where: { value: newToken } });
    return accessToken ? this.createTokenString() : newToken;
  }
}
