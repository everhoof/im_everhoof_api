/// <reference types="multer" />
import { UploadService } from '@modules/upload/upload.service';
import { User } from '@modules/users/entities/users.entity';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File, req: {
        user: User;
    }): Promise<unknown>;
}
