import { User } from '@modules/users/entities/users.entity';
export declare class Token {
    readonly id: number;
    value: string;
    ownerId: number;
    createdAt: Date;
    expiresAt: Nullable<Date>;
    usedAt: Nullable<Date>;
    owner: User;
}
