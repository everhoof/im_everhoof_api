import { User } from '@modules/users/entities/users.entity';
import { PunishmentTypes } from '@modules/users/args/punishment.args';
export declare class Punishment {
    readonly id: number;
    targetId: number;
    executorId: number;
    canceledById: number;
    type: PunishmentTypes;
    reason: string;
    createdAt: Date;
    cancelAt: Nullable<Date>;
    canceledAt: Nullable<Date>;
    target: User;
    executor: Nullable<User>;
    canceledBy: Nullable<User>;
}
