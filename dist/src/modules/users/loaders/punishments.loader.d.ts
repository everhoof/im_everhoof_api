import { OrderedNestDataLoader } from '@intelrug/nestjs-graphql-dataloader';
import { PunishmentsRepository } from '@modules/users/repositories/punishments.repository';
import { Punishment } from '@modules/users/entities/punishments.entity';
export declare class PunishmentsLoader extends OrderedNestDataLoader<{
    targetId: Punishment['targetId'];
    type: Punishment['type'];
}, Punishment> {
    private readonly punishments;
    constructor(punishments: PunishmentsRepository);
    protected getOptions: () => {
        propertyKey: string[];
        query: (keys: Array<{
            targetId: Punishment['targetId'];
            type: Punishment['type'];
        }>) => Promise<Punishment[]>;
    };
}
