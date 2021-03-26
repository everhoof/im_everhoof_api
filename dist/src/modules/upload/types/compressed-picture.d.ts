/// <reference types="node" />
export interface CompressedPicture {
    s: CompressedPictureRepresentation;
    m: CompressedPictureRepresentation;
}
export interface CompressedPictureRepresentation {
    buffer: Buffer;
    size: number;
}
