import { AfterLoad, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Picture } from '@modules/pictures/entities/pictures.entity';

@ObjectType()
@Entity('picture_representations')
export class PictureRepresentation {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    width: 10,
    unsigned: true,
  })
  readonly id: number;

  @Field()
  @Column({
    type: 'smallint',
    width: 5,
    unsigned: true,
  })
  height: number;

  @Field()
  @Column({
    type: 'smallint',
    width: 5,
    unsigned: true,
  })
  width: number;

  @Field()
  @Column({
    width: 10,
    unsigned: true,
  })
  size: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 1024,
  })
  path: string;

  @Field()
  link: string;

  @OneToOne(() => Picture, ({ s }) => s)
  sPack: Picture;

  @OneToOne(() => Picture, ({ m }) => m)
  mPack: Picture;

  @OneToOne(() => Picture, ({ o }) => o)
  oPack: Picture;

  @AfterLoad()
  private setLink() {
    this.link = !/^http/.test(this.path) ? process.env.CDN_URL + this.path : this.path;
  }
}
