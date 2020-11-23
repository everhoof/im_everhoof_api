import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';
import { PictureRepresentationsRepository } from '@modules/pictures/repositories/picture-representations.repository';
import { UploadService } from '@modules/upload/upload.service';
import { UploadController } from '@modules/upload/upload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PicturesRepository, PictureRepresentationsRepository])],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
