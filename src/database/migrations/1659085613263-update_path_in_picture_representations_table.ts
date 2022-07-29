import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePathInPictureRepresentationsTable1659085613263 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".picture_representations ALTER COLUMN path TYPE varchar(1024)`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".picture_representations ALTER COLUMN path TYPE varchar(191)`,
      );
    }
  }
}
