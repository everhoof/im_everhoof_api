import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { UploadService } from '@modules/upload/upload.service';
import { User } from '@modules/users/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(HttpExceptionFilter)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/image')
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './upload',
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter(req, file, callback): void {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          callback(
            new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST),
            false,
          );
        }
        return callback(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req: { user: User }): Promise<unknown> {
    return this.uploadService.uploadPicture(file, req.user);
  }
}
