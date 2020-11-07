import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMessagesTable1604714400000 implements MigrationInterface {
  name = 'CreateMessagesTable1604714400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
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
            name: 'owner_id',
            type: 'int',
            width: 10,
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '32',
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
    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        name: 'messages_foreign_owner_id',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('messages', 'messages_foreign_owner_id');
    await queryRunner.dropTable('messages');
  }
}
