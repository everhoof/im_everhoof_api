import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({
    name: 'owner_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  ownerId: Nullable<number>;

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

  @RelationId((message: Message) => message.pictures)
  pictureIds: number[];

  @ManyToOne(() => User, ({ messages }) => messages, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: User;

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
