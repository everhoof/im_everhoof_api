import { Confirmation } from '@modules/accounts/entities/confirmations.entity';
import { ConfirmationType } from '@modules/accounts/types/confirmation-type.enum';
import { BasicRepository } from '@common/repositories/basic.repository';
export declare class ConfirmationsRepository extends BasicRepository<Confirmation> {
    createNewConfirmation(userId: number, type: ConfirmationType): Promise<Confirmation>;
    getConfirmationByValue(value: string): Promise<Confirmation | undefined>;
    private createConfirmationString;
}
