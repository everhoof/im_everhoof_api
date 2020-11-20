import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users/entities/users.entity';

@ObjectType()
@Entity('tokens')
export class Token {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    unsigned: true,
    width: 10,
  })
  readonly id: number;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 64,
  })
  value: string;

  @Field(() => Int)
  @Column({
    type: 'int',
    name: 'owner_id',
    unsigned: true,
    width: 10,
  })
  ownerId: number;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'expires_at',
    nullable: true,
  })
  expiresAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'used_at',
    nullable: true,
  })
  usedAt: Date;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: User;
}
