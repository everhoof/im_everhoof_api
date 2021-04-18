import { ConfirmationType } from '@modules/accounts/types/confirmation-type.enum';
import { User } from '@modules/users/entities/users.entity';
export declare class Confirmation {
    readonly id: number;
    value: string;
    userId: number;
    type: ConfirmationType;
    createdAt: Date;
    user: User;
}
