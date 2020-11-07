import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetPictureByIdArgs } from '@modules/pictures/args/get-picture-by-id.args';
import { Picture } from '@modules/pictures/entities/pictures.entity';

@Injectable()
export class PicturesService {
  constructor(@InjectRepository(PicturesRepository) private readonly picturesRepository: PicturesRepository) {}
  async getPictureById(args: GetPictureByIdArgs): Promise<Picture> {
    const picture = await this.picturesRepository.findOne(args.pictureId);
    if (!picture) throw new NotFoundException();
    return picture;
  }
}
