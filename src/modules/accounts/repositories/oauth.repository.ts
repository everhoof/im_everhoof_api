import { EntityRepository, Repository } from 'typeorm';
import { OAuth } from '@modules/accounts/entities/oauth.entity';

@EntityRepository(OAuth)
export class OAuthRepository extends Repository<OAuth> {}
