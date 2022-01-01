import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@modules/common/repositories/basic.repository';
import { Message } from '@modules/messages/entities/messages.entity';

@EntityRepository(Message)
export class MessagesRepository extends BasicRepository<Message> {}
