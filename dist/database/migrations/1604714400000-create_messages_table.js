"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessagesTable1604714400000 = void 0;
const typeorm_1 = require("typeorm");
class CreateMessagesTable1604714400000 {
    constructor() {
        this.name = 'CreateMessagesTable1604714400000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'messages',
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
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '32',
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
        }));
        await queryRunner.createForeignKey('messages', new typeorm_1.TableForeignKey({
            name: 'messages_foreign_owner_id',
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('messages', 'messages_foreign_owner_id');
        await queryRunner.dropTable('messages');
    }
}
exports.CreateMessagesTable1604714400000 = CreateMessagesTable1604714400000;
//# sourceMappingURL=1604714400000-create_messages_table.js.map