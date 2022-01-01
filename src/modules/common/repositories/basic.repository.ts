import { Repository, FindManyOptions } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@modules/common/exceptions/exceptions';
import { GetListArgs } from '@modules/common/args/get-list.args';

export class BasicRepository<Entity> extends Repository<Entity> {
  async getList(args: GetListArgs, options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.find({
      skip: (args.page - 1) * args.count,
      take: args.count,
      ...(options ?? {}),
    });
  }

  async saveAndReturn(entity: Entity | undefined): Promise<Entity> {
    if (!entity) throw new InternalServerErrorException('UNKNOWN');
    entity = await this.save(entity);
    entity = await this.findOne(entity['id'] as number);
    if (!entity) throw new InternalServerErrorException('UNKNOWN');
    return entity;
  }

  async isExist(id: number): Promise<Entity> {
    if (!id) throw new InternalServerErrorException('UNKNOWN');
    const entity = await this.findOne(id);
    if (!entity) throw new BadRequestException('FORBIDDEN');
    return entity;
  }
}
