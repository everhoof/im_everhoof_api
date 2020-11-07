import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateUserRolesTable1602990000000 implements MigrationInterface {
  name = 'CreateUserRolesTable1602990000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        columns: [
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            width: 10,
          },
          {
            name: 'role_id',
            type: 'int',
            unsigned: true,
            width: 10,
          },
        ],
      }),
    );
    await queryRunner.createPrimaryKey('user_roles', ['user_id', 'role_id']);
    await queryRunner.createIndex(
      'user_roles',
      new TableIndex({
        name: 'user_roles_index_user_id',
        columnNames: ['user_id'],
      }),
    );
    await queryRunner.createIndex(
      'user_roles',
      new TableIndex({
        name: 'user_roles_index_role_id',
        columnNames: ['role_id'],
      }),
    );
    await queryRunner.createForeignKey(
      'user_roles',
      new TableForeignKey({
        name: 'user_roles_foreign_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'user_roles',
      new TableForeignKey({
        name: 'user_roles_foreign_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_roles', 'user_roles_foreign_user_id');
    await queryRunner.dropForeignKey('user_roles', 'user_roles_foreign_role_id');
    await queryRunner.dropTable('user_roles');
  }
}
