import { Injectable, Scope } from '@nestjs/common';
import { OrderedNestDataLoader } from '@intelrug/nestjs-graphql-dataloader';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';

@Injectable({ scope: Scope.REQUEST })
export class PicturesLoader extends OrderedNestDataLoader<Picture['id'], Picture> {
  constructor(@InjectRepository(PicturesRepository) private readonly picturesRepository: PicturesRepository) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getOptions = () => ({
    query: (keys: Array<Picture['id']>) => this.picturesRepository.findByIds(keys),
  });
}
