import { EntityRepository } from 'typeorm';
import { randomBytes } from 'crypto';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { BasicRepository } from '@modules/common/repositories/basic.repository';

@EntityRepository(Token)
export class TokensRepository extends BasicRepository<Token> {
  async createNewToken(ownerId: number): Promise<Token> {
    const tokenString = await this.createTokenString();
    let tokenEntity: Token | undefined = this.create({
      value: tokenString,
      ownerId: ownerId,
    });
    tokenEntity = await this.save(tokenEntity);
    tokenEntity = await this.findOneOrFail(tokenEntity.id);
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

  public async expireUserTokens(ownerId: number): Promise<void> {
    await this.delete({ ownerId });
  }
}
