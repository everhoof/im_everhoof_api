import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ConfirmationType } from '@modules/accounts/types/confirmation-type.enum';
import { User } from '@modules/users/entities/users.entity';

registerEnumType(ConfirmationType, { name: 'ConfirmationType' });

@ObjectType()
@Entity('confirmations')
@Unique('confirmations_unique_value', ['value'])
export class Confirmation {
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
    length: 64,
  })
  value: string;

  @Field(() => Int)
  @Column({
    name: 'user_id',
    type: 'int',
    width: 10,
    unsigned: true,
  })
  userId: number;

  @Field(() => ConfirmationType)
  @Column({
    type: 'varchar',
    length: '16',
  })
  type: ConfirmationType;

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

  @Field(() => Int)
  @Column({
    type: 'smallint',
    name: 'send_count',
    default: '1',
  })
  sendCount: number;

  @ManyToOne(() => User, (user) => user.confirmations, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}
