import { OrderedNestDataLoader } from '@intelrug/nestjs-graphql-dataloader';
import { PictureRepresentation } from '@modules/pictures/entities/picture-representations.entity';
import { PictureRepresentationsRepository } from '@modules/pictures/repositories/picture-representations.repository';
export declare class PictureRepresentationsLoader extends OrderedNestDataLoader<PictureRepresentation['id'], PictureRepresentation> {
    private readonly pictureRepresentationsRepository;
    constructor(pictureRepresentationsRepository: PictureRepresentationsRepository);
    protected getOptions: () => {
        query: (keys: Array<PictureRepresentation['id']>) => Promise<PictureRepresentation[]>;
    };
}
