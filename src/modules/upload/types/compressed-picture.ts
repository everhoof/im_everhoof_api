import { Dimensions } from 'gm';

export interface CompressedPicture {
  s: CompressedPictureRepresentation;
  m: CompressedPictureRepresentation;
}

export interface CompressedPictureRepresentation {
  buffer: Buffer;
  size: number;
}
