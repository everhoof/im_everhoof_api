import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { Role } from '@modules/roles/entities/roles.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { Confirmation } from '@modules/accounts/entities/confirmations.entity';

export enum UserState {
  ONLINE = 'ONLINE',
  IDLE = 'IDLE',
  OFFLINE = 'OFFLINE',
}

registerEnumType(UserState, { name: 'UserState' });

@ObjectType()
@Entity('users')
@Unique('users_unique_email', ['email'])
@Unique('users_unique_username', ['username'])
export class User {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    width: 10,
    generated: 'increment',
    unsigned: true,
  })
  readonly id: number;

  @Column({
    type: 'varchar',
    length: 254,
    unique: true,
  })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  username?: string;

  @Field(() => String, { nullable: true })
  @Column({
    name: 'avatar_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  avatarId: Nullable<number>;

  @Column({
    length: 64,
    select: false,
    nullable: true,
  })
  salt?: string;

  @Column({
    length: 64,
    select: false,
    nullable: true,
  })
  hash?: string;

  @Column({
    name: 'email_confirmed',
    type: 'boolean',
  })
  emailConfirmed: boolean;

  @Field(() => UserState)
  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.OFFLINE,
  })
  state: UserState;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'was_online_at',
    nullable: true,
  })
  wasOnlineAt?: Date;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => Token, ({ owner }) => owner)
  tokens: Token[];

  @ManyToOne(() => Picture, ({ avatars }) => avatars, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'avatar_id',
    referencedColumnName: 'id',
  })
  avatar: Nullable<Picture>;

  @OneToMany(() => Token, ({ owner }) => owner)
  messages: Message[];

  @OneToMany(() => Picture, ({ owner }) => owner)
  pictures: Picture[];

  @OneToMany(() => Punishment, ({ target }) => target)
  punishments: Punishment[];

  @OneToMany(() => Punishment, ({ executor }) => executor)
  executedPunishments: Punishment[];

  @OneToMany(() => Punishment, ({ canceledBy }) => canceledBy)
  canceledPunishments: Punishment[];

  @OneToMany(() => Confirmation, ({ user }) => user)
  confirmations: Confirmation[];

  @Field(() => [Role])
  @ManyToMany(() => Role, ({ users }) => users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  get roleNames(): string[] {
    if (!this.roles) return [];
    return this.roles.map(({ name }) => name);
  }

  get highestRole(): Role | undefined {
    let role: Role | undefined;
    this.roles.forEach((r) => {
      if (role && r.id > role.id) {
        role = r;
      }
    });
    return role;
  }
}
