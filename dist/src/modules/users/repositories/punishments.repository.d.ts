import { BasicRepository } from '@common/repositories/basic.repository';
import { Punishment } from '@modules/users/entities/punishments.entity';
export declare class PunishmentsRepository extends BasicRepository<Punishment> {
    getLastPunishment(userId: number): Promise<Punishment | undefined>;
}
