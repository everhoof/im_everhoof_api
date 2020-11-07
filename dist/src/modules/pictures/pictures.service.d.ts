import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { GetPictureByIdArgs } from '@modules/pictures/args/get-picture-by-id.args';
import { Picture } from '@modules/pictures/entities/pictures.entity';
export declare class PicturesService {
    private readonly picturesRepository;
    constructor(picturesRepository: PicturesRepository);
    getPictureById(args: GetPictureByIdArgs): Promise<Picture>;
}
