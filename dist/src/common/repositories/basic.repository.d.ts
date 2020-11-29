import { Repository, FindManyOptions } from 'typeorm';
import { GetListArgs } from '@common/args/get-list.args';
export declare class BasicRepository<Entity> extends Repository<Entity> {
    getList(args: GetListArgs, options?: FindManyOptions<Entity>): Promise<Entity[]>;
    saveAndReturn(entity: Entity | undefined): Promise<Entity>;
    isExist(id: number): Promise<Entity>;
}
