"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSystemToMessagesTable1616685132278 = void 0;
const typeorm_1 = require("typeorm");
class addSystemToMessagesTable1616685132278 {
    async up(queryRunner) {
        await queryRunner.addColumn('messages', new typeorm_1.TableColumn({
            name: 'system',
            type: 'boolean',
            default: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('messages', 'system');
    }
}
exports.addSystemToMessagesTable1616685132278 = addSystemToMessagesTable1616685132278;
//# sourceMappingURL=1616685132278-add_system_to_messages_table.js.map