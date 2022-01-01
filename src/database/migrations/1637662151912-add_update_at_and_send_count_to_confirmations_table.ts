import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUpdateAtAndSendCountToConfirmationsTable1637662151912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'confirmations',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'confirmations',
      new TableColumn({
        name: 'send_count',
        type: 'smallint',
        default: '1',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('confirmations', 'updated_at');
    await queryRunner.dropColumn('confirmations', 'send_count');
  }
}
