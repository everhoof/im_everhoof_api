import { Picture } from '@modules/pictures/entities/pictures.entity';
import { PicturesService } from '@modules/pictures/pictures.service';
import { PictureRepresentation } from '@modules/pictures/entities/picture-representations.entity';
import DataLoader from 'dataloader';
import { GetPictureByIdArgs } from '@modules/pictures/args/get-picture-by-id.args';
import { User } from '@modules/users/entities/users.entity';
export declare class PicturesResolver {
    private readonly picturesService;
    constructor(picturesService: PicturesService);
    owner(picture: Picture, usersLoader: DataLoader<User['id'], User>): Promise<Nullable<User>>;
    s(picture: Picture, pictureRepresentationsLoader: DataLoader<PictureRepresentation['id'], PictureRepresentation>): Promise<PictureRepresentation>;
    m(picture: Picture, pictureRepresentationsLoader: DataLoader<PictureRepresentation['id'], PictureRepresentation>): Promise<PictureRepresentation>;
    o(picture: Picture, pictureRepresentationsLoader: DataLoader<PictureRepresentation['id'], PictureRepresentation>): Promise<PictureRepresentation>;
    getPictureById(args: GetPictureByIdArgs): Promise<Picture>;
}
