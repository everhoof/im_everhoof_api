"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessagePicturesTable1604718000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateMessagePicturesTable1604718000000 {
    constructor() {
        this.name = 'CreateMessagePicturesTable1604718000000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
        await queryRunner.createPrimaryKey('message_pictures', ['message_id', 'picture_id']);
        await queryRunner.createIndex('message_pictures', new typeorm_1.TableIndex({
            name: 'message_pictures_index_message_id',
            columnNames: ['message_id'],
        }));
        await queryRunner.createIndex('message_pictures', new typeorm_1.TableIndex({
            name: 'message_pictures_index_picture_id',
            columnNames: ['picture_id'],
        }));
        await queryRunner.createForeignKey('message_pictures', new typeorm_1.TableForeignKey({
            name: 'message_pictures_foreign_message_id',
            columnNames: ['message_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'messages',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
        }));
        await queryRunner.createForeignKey('message_pictures', new typeorm_1.TableForeignKey({
            name: 'message_pictures_foreign_picture_id',
            columnNames: ['picture_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pictures',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('message_pictures', 'message_pictures_foreign_message_id');
        await queryRunner.dropForeignKey('message_pictures', 'message_pictures_foreign_picture_id');
        await queryRunner.dropTable('message_pictures');
    }
}
exports.CreateMessagePicturesTable1604718000000 = CreateMessagePicturesTable1604718000000;
//# sourceMappingURL=1604718000000-create_message_pictures_table.js.map