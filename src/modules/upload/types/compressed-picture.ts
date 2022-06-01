export interface CompressedPicture {
  o: CompressedPictureRepresentationNoSize;
  s: CompressedPictureRepresentation;
  m: CompressedPictureRepresentation;
}

export interface CompressedPictureRepresentation {
  buffer: Buffer;
  size: number;
}

export interface CompressedPictureRepresentationNoSize {
  buffer: Buffer;
}
