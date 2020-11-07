import { BasicRepository } from '@common/repositories/basic.repository';
import { Role } from '@modules/roles/entities/roles.entity';
export declare class RolesRepository extends BasicRepository<Role> {
    getDefaultRole(): Promise<Role>;
}
