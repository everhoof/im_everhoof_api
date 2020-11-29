import { OrderedNestDataLoader } from '@intelrug/nestjs-graphql-dataloader';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
export declare class PicturesLoader extends OrderedNestDataLoader<Picture['id'], Picture> {
    private readonly picturesRepository;
    constructor(picturesRepository: PicturesRepository);
    protected getOptions: () => {
        query: (keys: Array<Picture['id']>) => Promise<Picture[]>;
    };
}
