import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeUsernameNullableInMessagesTable1616688487961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".messages ALTER COLUMN username DROP NOT NULL`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `UPDATE "${queryRunner.connection.options.schema}".messages SET username = 'unknown' WHERE username IS NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".messages ALTER COLUMN username SET NOT NULL`,
      );
    }
  }
}
