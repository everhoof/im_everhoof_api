import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSchemaToMessagesTable1642163119570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'schema',
        type: 'varchar',
        length: '6',
        default: '1',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('messages', 'schema');
  }
}
