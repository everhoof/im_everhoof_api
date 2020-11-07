import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateMessagePicturesTable1604718000000 implements MigrationInterface {
  name = 'CreateMessagePicturesTable1604718000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message_pictures',
        columns: [
          {
            name: 'message_id',
            type: 'int',
            unsigned: true,
            width: 10,
          },
          {
            name: 'picture_id',
            type: 'int',
            unsigned: true,
            width: 10,
          },
        ],
      }),
    );
    await queryRunner.createPrimaryKey('message_pictures', ['message_id', 'picture_id']);
    await queryRunner.createIndex(
      'message_pictures',
      new TableIndex({
        name: 'message_pictures_index_message_id',
        columnNames: ['message_id'],
      }),
    );
    await queryRunner.createIndex(
      'message_pictures',
      new TableIndex({
        name: 'message_pictures_index_picture_id',
        columnNames: ['picture_id'],
      }),
    );
    await queryRunner.createForeignKey(
      'message_pictures',
      new TableForeignKey({
        name: 'message_pictures_foreign_message_id',
        columnNames: ['message_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'messages',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
    await queryRunner.createForeignKey(
      'message_pictures',
      new TableForeignKey({
        name: 'message_pictures_foreign_picture_id',
        columnNames: ['picture_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pictures',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('message_pictures', 'message_pictures_foreign_message_id');
    await queryRunner.dropForeignKey('message_pictures', 'message_pictures_foreign_picture_id');
    await queryRunner.dropTable('message_pictures');
  }
}
