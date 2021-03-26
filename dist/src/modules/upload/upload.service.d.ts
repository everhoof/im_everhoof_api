/// <reference types="multer" />
/// <reference types="node" />
import gm, { Dimensions } from 'gm';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { PictureRepresentationsRepository } from '@modules/pictures/repositories/picture-representations.repository';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { User } from '@modules/users/entities/users.entity';
import { CompressedPicture } from '@modules/upload/types/compressed-picture';
import { DiscordMessage } from '@modules/upload/types/DiscordMessage';
import { UploadedPicture } from '@modules/upload/types/uploaded-picture';
export declare class UploadService {
    private readonly picturesRepository;
    private readonly pictureRepresentationsRepository;
    private static QUEUE_LIMIT;
    private static MIN_HEIGHT;
    private static MIN_WIDTH;
    private static MAX_HEIGHT;
    private static MAX_WIDTH;
    private static GM_MEMORY_LIMIT;
    private static GM_THREADS_LIMIT;
    private readonly httpClient;
    private static queue;
    private readonly logger;
    constructor(picturesRepository: PicturesRepository, pictureRepresentationsRepository: PictureRepresentationsRepository);
    uploadPicture(file: Express.Multer.File, user: User, source?: string): Promise<Picture>;
    generateObjectPath(options: {
        path?: string;
        name?: string;
        ext?: string;
    }): string;
    savePicture(ownerId: number, representations: UploadedPicture): Promise<Picture>;
    uploadFileToDiscord(file: Express.Multer.File): Promise<DiscordMessage>;
    scale(dimensions: Dimensions, ratio: number, limit?: number): Dimensions;
    compressImage(gmInstance: gm.State): Promise<CompressedPicture>;
    gmToBuffer(data: gm.State): Promise<Buffer>;
    gmToDimensions(data: gm.State): Promise<Dimensions>;
    bufferToFileSize(buffer: Buffer): number;
}
