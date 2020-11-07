import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1602979200000 implements MigrationInterface {
  name = 'CreateUsersTable1602979200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            width: 10,
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '254',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '32',
          },
          {
            name: 'avatar_id',
            type: 'int',
            width: 10,
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'salt',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'hash',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'was_online_at',
            type: 'datetime',
            width: 6,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            width: 6,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            width: 6,
            default: 'CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
