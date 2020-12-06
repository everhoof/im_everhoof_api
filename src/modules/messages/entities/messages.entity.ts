import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';

@ObjectType()
@Entity('messages')
export class Message {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    unsigned: true,
    width: 10,
  })
  readonly id: number;

  @Field(() => Number, { nullable: true })
  @Column({
    name: 'owner_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  ownerId: Nullable<number>;

  @Field(() => String, { nullable: true })
  @Column({
    name: 'random_id',
    type: 'varchar',
    length: 32,
    unsigned: true,
    nullable: true,
  })
  randomId: Nullable<string>;

  @Field(() => String)
  @Column({
    type: 'text',
  })
  content: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 32,
  })
  username: string;

  @Field(() => Number, { nullable: true })
  @Column({
    name: 'deleted_by_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  deletedById: Nullable<number>;

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

  @Index('messages_idx_deleted_at')
  @Field(() => Date, { nullable: true })
  @Column({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Nullable<Date>;

  @RelationId((message: Message) => message.pictures)
  pictureIds: number[];

  @ManyToOne(() => User, ({ messages }) => messages, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: User;

  @ManyToOne(() => User, ({ messages }) => messages, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'deleted_by_id',
    referencedColumnName: 'id',
  })
  deletedBy: User;

  @ManyToMany(() => Picture, ({ messages }) => messages)
  @JoinTable({
    name: 'message_pictures',
    joinColumn: {
      name: 'message_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'picture_id',
      referencedColumnName: 'id',
    },
  })
  pictures: Picture[];
}
