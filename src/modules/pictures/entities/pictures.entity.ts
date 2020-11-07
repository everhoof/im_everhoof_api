import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PictureRepresentation } from '@modules/pictures/entities/picture-representations.entity';
import { User } from '@modules/users/entities/users.entity';
import { Message } from '@modules/messages/entities/messages.entity';

@ObjectType()
@Entity('pictures')
export class Picture {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    width: 10,
    generated: 'increment',
    unsigned: true,
  })
  readonly id: number;

  @Field(() => Int, { nullable: true })
  @Column({
    name: 'owner_id',
    type: 'int',
    width: 10,
    unsigned: true,
    nullable: true,
  })
  ownerId: Nullable<number>;

  @Field(() => Int)
  @Column({
    name: 's_id',
    width: 10,
    unsigned: true,
  })
  sId: number;

  @Field(() => Int)
  @Column({
    name: 'm_id',
    width: 10,
    unsigned: true,
  })
  mId: number;

  @Field(() => Int)
  @Column({
    name: 'o_id',
    width: 10,
    unsigned: true,
  })
  oId: number;

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

  @OneToOne(() => PictureRepresentation, ({ sPack }) => sPack)
  @JoinColumn({
    name: 's_id',
    referencedColumnName: 'id',
  })
  s: PictureRepresentation;

  @OneToOne(() => PictureRepresentation, ({ mPack }) => mPack)
  @JoinColumn({
    name: 'm_id',
    referencedColumnName: 'id',
  })
  m: PictureRepresentation;

  @OneToOne(() => PictureRepresentation, ({ oPack }) => oPack)
  @JoinColumn({
    name: 'o_id',
    referencedColumnName: 'id',
  })
  o: PictureRepresentation;

  @ManyToOne(() => User, ({ pictures }) => pictures, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: Nullable<User>;

  @OneToMany(() => User, ({ avatar }) => avatar)
  @JoinColumn()
  avatars: User[];

  @ManyToMany(() => Message, ({ pictures }) => pictures)
  messages: Message[];
}
