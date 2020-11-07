import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users/entities/users.entity';

@ObjectType()
@Entity('roles')
export class Role {
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
  name: string;

  @ManyToMany(() => User, ({ roles }) => roles, { lazy: true })
  users: Promise<User[]>;
}
