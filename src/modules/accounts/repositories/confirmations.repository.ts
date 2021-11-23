import { EntityRepository } from 'typeorm';
import { Confirmation } from '@modules/accounts/entities/confirmations.entity';
import { ConfirmationType } from '@modules/accounts/types/confirmation-type.enum';
import { InternalServerErrorException } from '@nestjs/common';
import { Utils } from '@common/utils/utils';
import { BasicRepository } from '@common/repositories/basic.repository';

@EntityRepository(Confirmation)
export class ConfirmationsRepository extends BasicRepository<Confirmation> {
  async createNewConfirmation(userId: number, type: ConfirmationType, sendCount = 0): Promise<Confirmation> {
    if (!userId) throw new InternalServerErrorException('UNKNOWN');

    let confirmationEntity: Confirmation | undefined = await this.findOne({ where: { userId, type } });
    if (confirmationEntity) {
      confirmationEntity.createdAt = new Date();
    } else {
      const confirmationString = await this.createConfirmationString();
      confirmationEntity = this.create({
        value: confirmationString,
        userId,
        type,
        sendCount,
      });
    }

    return this.saveAndReturn(confirmationEntity);
  }

  getConfirmationByValue(value: string): Promise<Confirmation | undefined> {
    if (!value) return Promise.resolve(undefined);
    return this.findOne({ where: { value } });
  }

  private async createConfirmationString(): Promise<string> {
    const newValue = Utils.getRandomString();
    const value = await this.findOne({ where: { value: newValue } });
    return value ? this.createConfirmationString() : newValue;
  }

  findOnePasswordResetByUserId(userId: number): Promise<Confirmation | undefined> {
    return this.findOne({ where: { userId, type: ConfirmationType.password } });
  }
}
