import { EntityRepository } from 'typeorm';
import { PictureRepresentation } from '@modules/pictures/entities/picture-representations.entity';
import { BasicRepository } from '@modules/common/repositories/basic.repository';

@EntityRepository(PictureRepresentation)
export class PictureRepresentationsRepository extends BasicRepository<PictureRepresentation> {}
