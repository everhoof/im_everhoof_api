import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class addDeletedFieldsToMessagesTable1607203587481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'deleted_by_id',
        type: 'int',
        width: 10,
        unsigned: true,
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
    await queryRunner.createIndex(
      'messages',
      new TableIndex({
        name: 'messages_idx_deleted_at',
        columnNames: ['deleted_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('messages', 'messages_idx_deleted_at');
    await queryRunner.dropColumn('messages', 'deleted_at');
    await queryRunner.dropColumn('messages', 'deleted_by_id');
  }
}
