import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from '@modules/messages/repositories/messages.repository';
import { MessagesService } from '@modules/messages/messages.service';
import { MessagesResolver } from '@modules/messages/messages.resolver';
import { PicturesRepository } from '@modules/pictures/repositories/pictures.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesRepository, PicturesRepository])],
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
