import { EntityRepository, IsNull } from 'typeorm';
import { BasicRepository } from '@common/repositories/basic.repository';
import { Punishment } from '@modules/users/entities/punishments.entity';

@EntityRepository(Punishment)
export class PunishmentsRepository extends BasicRepository<Punishment> {
  public getLastPunishment(userId: number): Promise<Punishment | undefined> {
    return this.findOne({
      where: {
        targetId: userId,
        canceledAt: IsNull(),
      },
    });
  }
}
