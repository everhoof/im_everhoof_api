import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePicturesTable1604710800000 implements MigrationInterface {
  name = 'CreatePicturesTable1604710800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pictures',
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
            name: 's_id',
            type: 'int',
            width: 10,
            unsigned: true,
          },
          {
            name: 'm_id',
            type: 'int',
            width: 10,
            unsigned: true,
          },
          {
            name: 'o_id',
            type: 'int',
            width: 10,
            unsigned: true,
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
      'pictures',
      new TableForeignKey({
        name: 'pictures_foreign_owner_id',
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'pictures',
      new TableForeignKey({
        name: 'pictures_foreign_s_id',
        columnNames: ['s_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'picture_representations',
      }),
    );
    await queryRunner.createForeignKey(
      'pictures',
      new TableForeignKey({
        name: 'pictures_foreign_m_id',
        columnNames: ['m_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'picture_representations',
      }),
    );
    await queryRunner.createForeignKey(
      'pictures',
      new TableForeignKey({
        name: 'pictures_foreign_o_id',
        columnNames: ['o_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'picture_representations',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pictures', 'pictures_foreign_owner_id');
    await queryRunner.dropForeignKey('pictures', 'pictures_foreign_s_id');
    await queryRunner.dropForeignKey('pictures', 'pictures_foreign_m_id');
    await queryRunner.dropForeignKey('pictures', 'pictures_foreign_o_id');
    await queryRunner.dropTable('pictures');
  }
}
