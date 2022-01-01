import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm';

export class createConfirmationsTable1616859340378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'confirmations',
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
            name: 'value',
            type: 'varchar',
            length: '64',
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            width: 10,
            unsigned: true,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '16',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'confirmations',
      new TableForeignKey({
        name: 'confirmations_foreign_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createUniqueConstraint(
      'confirmations',
      new TableUnique({
        name: 'confirmations_unique_value',
        columnNames: ['value'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('confirmations', 'confirmations_unique_value');
    await queryRunner.dropForeignKey('confirmations', 'confirmations_foreign_user_id');
    await queryRunner.dropTable('confirmations');
  }
}
