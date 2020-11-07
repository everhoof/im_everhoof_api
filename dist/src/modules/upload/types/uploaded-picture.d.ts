import { Dimensions } from 'gm';
export interface UploadedPicture {
    s: UploadedPictureRepresentation;
    m: UploadedPictureRepresentation;
    o: UploadedPictureRepresentation;
}
export interface UploadedPictureRepresentation {
    key: string;
    dimensions: Dimensions;
    size: number;
}
