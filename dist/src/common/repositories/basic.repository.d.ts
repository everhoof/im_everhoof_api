import { Repository, FindConditions } from 'typeorm';
import { GetListArgs } from '@common/args/get-list.args';
export declare class BasicRepository<T> extends Repository<T & {
    id: number;
}> {
    getList(args: GetListArgs, options?: FindConditions<T>): Promise<T[]>;
    saveAndReturn(entity: (T & {
        id: number;
    }) | undefined): Promise<T & {
        id: number;
    }>;
    isExist(id: number): Promise<T>;
}
