import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasicRoles1602986400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `roles` (`name`) VALUES (?), (?), (?), (?)', [
      'UNVERIFIED_USER',
      'USER',
      'MODERATOR',
      'ADMIN',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `roles` WHERE `name` = ? OR `name` = ? OR `name` = ? OR `name` = ?', [
      'UNVERIFIED_USER',
      'USER',
      'MODERATOR',
      'ADMIN',
    ]);
  }
}
