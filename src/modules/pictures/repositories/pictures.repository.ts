import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@common/repositories/basic.repository';
import { Picture } from '@modules/pictures/entities/pictures.entity';

@EntityRepository(Picture)
export class PicturesRepository extends BasicRepository<Picture> {}
