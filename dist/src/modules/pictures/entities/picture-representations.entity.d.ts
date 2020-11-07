import { Picture } from '@modules/pictures/entities/pictures.entity';
export declare class PictureRepresentation {
    readonly id: number;
    height: number;
    width: number;
    size: number;
    path: string;
    link: string;
    sPack: Picture;
    mPack: Picture;
    oPack: Picture;
    private setLink;
}
