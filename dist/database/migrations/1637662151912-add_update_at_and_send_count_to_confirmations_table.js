"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUpdateAtAndSendCountToConfirmationsTable1637662151912 = void 0;
const typeorm_1 = require("typeorm");
class addUpdateAtAndSendCountToConfirmationsTable1637662151912 {
    async up(queryRunner) {
        await queryRunner.addColumn('confirmations', new typeorm_1.TableColumn({
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
        }));
        await queryRunner.addColumn('confirmations', new typeorm_1.TableColumn({
            name: 'send_count',
            type: 'smallint',
            default: '1',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('confirmations', 'updated_at');
        await queryRunner.dropColumn('confirmations', 'send_count');
    }
}
exports.addUpdateAtAndSendCountToConfirmationsTable1637662151912 = addUpdateAtAndSendCountToConfirmationsTable1637662151912;
//# sourceMappingURL=1637662151912-add_update_at_and_send_count_to_confirmations_table.js.map