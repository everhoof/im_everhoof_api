import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addRandomIdToMessages1606116039145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'random_id',
        type: 'varchar',
        length: '32',
        unsigned: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('messages', 'random_id');
  }
}
