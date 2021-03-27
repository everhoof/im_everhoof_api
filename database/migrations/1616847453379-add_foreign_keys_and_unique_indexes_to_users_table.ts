import { MigrationInterface, QueryRunner, TableForeignKey, TableUnique } from 'typeorm';

export class addForeignKeysAndUniqueIndexesToUsersTable1616847453379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'users_foreign_owner_id',
        columnNames: ['avatar_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pictures',
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        name: 'users_unique_email',
        columnNames: ['email'],
      }),
    );
    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        name: 'users_unique_username',
        columnNames: ['username'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'users_foreign_owner_id');
    await queryRunner.dropUniqueConstraint('users', 'users_unique_email');
    await queryRunner.dropUniqueConstraint('users', 'users_unique_username');
  }
}
