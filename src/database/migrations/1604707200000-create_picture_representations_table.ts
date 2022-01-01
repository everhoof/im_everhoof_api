import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePictureRepresentationsTable1604707200000 implements MigrationInterface {
  name = 'CreatePictureRepresentationsTable1604707200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'picture_representations',
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
            name: 'height',
            type: 'smallint',
            width: 5,
            unsigned: true,
          },
          {
            name: 'width',
            type: 'smallint',
            width: 5,
            unsigned: true,
          },
          {
            name: 'size',
            type: 'int',
            width: 10,
            unsigned: true,
          },
          {
            name: 'path',
            type: 'varchar',
            length: '191',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('picture_representations');
  }
}
