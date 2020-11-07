import { Repository, FindConditions } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@common/exceptions/exceptions';
import { GetListArgs } from '@common/args/get-list.args';

export class BasicRepository<T> extends Repository<T & { id: number }> {
  async getList(args: GetListArgs, options?: FindConditions<T>): Promise<T[]> {
    return this.find({
      skip: (args.page - 1) * args.count,
      take: args.count,
      ...(options ?? {}),
    });
  }

  async saveAndReturn(entity: (T & { id: number }) | undefined): Promise<T & { id: number }> {
    if (!entity) throw new InternalServerErrorException('UNKNOWN');
    entity = await this.save(entity);
    entity = await this.findOne(entity.id);
    if (!entity) throw new InternalServerErrorException('UNKNOWN');
    return entity;
  }

  async isExist(id: number): Promise<T> {
    if (!id) throw new InternalServerErrorException('UNKNOWN');
    const entity = await this.findOne(id);
    if (!entity) throw new BadRequestException('FORBIDDEN');
    return entity;
  }
}
