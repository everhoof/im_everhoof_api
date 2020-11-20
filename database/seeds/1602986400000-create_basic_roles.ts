import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBasicRoles1602986400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = ['UNVERIFIED_USER', 'USER', 'MODERATOR', 'ADMIN'];
    for (const role of roles) {
      await queryRunner.query('INSERT INTO "im".roles (name) VALUES ($1)', [role]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roles = ['UNVERIFIED_USER', 'USER', 'MODERATOR', 'ADMIN'];
    for (const role of roles) {
      await queryRunner.query('DELETE FROM "im".roles WHERE name = $1', [role]);
    }
  }
}
