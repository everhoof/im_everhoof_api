import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class addDiscordSupport1620245717733 implements MigrationInterface {
  name = 'addDiscordSupport1620245717733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'oauth',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'access_token',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'user_id',
            type: 'int',
            unsigned: true,
            width: 10,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '32',
          },
          {
            name: 'external_id',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'data',
            type: 'jsonb',
          },
        ],
      }),
    );
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN hash DROP NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN salt DROP NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN username DROP NOT NULL`,
      );
    }
    await queryRunner.createIndex(
      'oauth',
      new TableIndex({
        name: 'oauth_user_id_index',
        columnNames: ['user_id'],
      }),
    );
    await queryRunner.createForeignKey(
      'oauth',
      new TableForeignKey({
        name: 'oauth_user_id_foreign',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if ('schema' in queryRunner.connection.options) {
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN hash SET NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN salt SET NOT NULL`,
      );
      await queryRunner.query(
        `ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN username SET NOT NULL`,
      );
    }
    await queryRunner.dropTable('oauth');
  }
}
