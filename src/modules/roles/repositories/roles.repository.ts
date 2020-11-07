import { EntityRepository } from 'typeorm';
import { BasicRepository } from '@common/repositories/basic.repository';
import { Role } from '@modules/roles/entities/roles.entity';
import { InternalServerErrorException } from '@common/exceptions/exceptions';

@EntityRepository(Role)
export class RolesRepository extends BasicRepository<Role> {
  async getDefaultRole(): Promise<Role> {
    const role = await this.findOne({ where: { name: 'USER' } });
    if (!role) throw new InternalServerErrorException('UNKNOWN');
    return role;
  }
}
