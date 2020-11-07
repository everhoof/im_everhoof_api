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
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { Role } from '@modules/roles/entities/roles.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    width: 10,
    generated: 'increment',
    unsigned: true,
  })
  readonly id: number;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 254,
  })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 32,
  })
  username: string;

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
  })
  salt: string;

  @Column({
    length: 64,
    select: false,
  })
  hash: string;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'was_online_at',
    type: 'datetime',
    width: 6,
    nullable: true,
  })
  wasOnlineAt: Nullable<Date>;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
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

  @JoinColumn()
  @OneToMany(() => Token, ({ owner }) => owner)
  messages: Message[];

  @OneToMany(() => Picture, ({ owner }) => owner)
  pictures: Picture[];

  @ManyToMany(() => Role, ({ users }) => users)
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
}
