import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '@modules/users/entities/users.entity';
import { OAuthType } from '@modules/accounts/types/oauth-type.enum';

@Entity('oauth')
@Index('oauth_user_id_index', ['userId'])
export class OAuth {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
  })
  readonly id: number;

  @Column({
    name: 'access_token',
    type: 'varchar',
    length: 255,
  })
  accessToken: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
  })
  refreshToken: string;

  @Column({
    type: 'int',
    name: 'user_id',
    unsigned: true,
    width: 10,
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  type: OAuthType;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: 255,
  })
  externalId: string;

  @Column({
    name: 'data',
    type: 'jsonb',
  })
  data: Record<string, unknown>;
}
