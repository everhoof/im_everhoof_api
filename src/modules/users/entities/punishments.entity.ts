import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users/entities/users.entity';
import { PunishmentTypes } from '@modules/users/args/punishment.args';

@ObjectType()
@Entity('punishments')
export class Punishment {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    width: 10,
    generated: 'increment',
    unsigned: true,
  })
  readonly id: number;

  @Field(() => Int)
  @Column({
    name: 'target_id',
    type: 'int',
    width: 10,
    unsigned: true,
  })
  targetId: number;

  @Field(() => Int, { nullable: true })
  @Column({
    name: 'executor_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  executorId: number;

  @Field(() => Int, { nullable: true })
  @Column({
    name: 'canceled_by_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  canceledById: number;

  @Field(() => PunishmentTypes)
  @Column({
    type: 'varchar',
    length: 16,
  })
  type: PunishmentTypes;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 200,
  })
  reason: string;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({
    type: 'timestamp with time zone',
    name: 'cancel_at',
    nullable: true,
  })
  cancelAt: Nullable<Date>;

  @Field(() => Date, { nullable: true })
  @Column({
    type: 'timestamp with time zone',
    name: 'canceled_at',
    nullable: true,
  })
  canceledAt: Nullable<Date>;

  @ManyToOne(() => User, ({ punishments }) => punishments, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'target_id',
    referencedColumnName: 'id',
  })
  target: User;

  @ManyToOne(() => User, ({ executedPunishments }) => executedPunishments, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'executor_id',
    referencedColumnName: 'id',
  })
  executor: Nullable<User>;

  @ManyToOne(() => User, ({ canceledPunishments }) => canceledPunishments, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'canceled_by_id',
    referencedColumnName: 'id',
  })
  canceledBy: Nullable<User>;
}
