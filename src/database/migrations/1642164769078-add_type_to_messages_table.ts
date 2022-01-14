import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addTypeToMessagesTable1642164769078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'type',
        type: 'int',
        default: 2,
      }),
    );
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `UPDATE "${queryRunner.connection.options.schema}".messages SET type = 1 WHERE system = true`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('messages', 'type');
  }
}
