"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDeletedFieldsToMessagesTable1607203587481 = void 0;
const typeorm_1 = require("typeorm");
class addDeletedFieldsToMessagesTable1607203587481 {
    async up(queryRunner) {
        await queryRunner.addColumn('messages', new typeorm_1.TableColumn({
            name: 'deleted_by_id',
            type: 'int',
            width: 10,
            unsigned: true,
            isNullable: true,
        }));
        await queryRunner.addColumn('messages', new typeorm_1.TableColumn({
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
        }));
        await queryRunner.createIndex('messages', new typeorm_1.TableIndex({
            name: 'messages_idx_deleted_at',
            columnNames: ['deleted_at'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('messages', 'messages_idx_deleted_at');
        await queryRunner.dropColumn('messages', 'deleted_at');
        await queryRunner.dropColumn('messages', 'deleted_by_id');
    }
}
exports.addDeletedFieldsToMessagesTable1607203587481 = addDeletedFieldsToMessagesTable1607203587481;
//# sourceMappingURL=1607203587481-add_deleted_fields_to_messages_table.js.map