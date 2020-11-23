"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRandomIdToMessages1606116039145 = void 0;
const typeorm_1 = require("typeorm");
class addRandomIdToMessages1606116039145 {
    async up(queryRunner) {
        await queryRunner.addColumn('messages', new typeorm_1.TableColumn({
            name: 'random_id',
            type: 'varchar',
            length: '32',
            unsigned: true,
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('messages', 'random_id');
    }
}
exports.addRandomIdToMessages1606116039145 = addRandomIdToMessages1606116039145;
//# sourceMappingURL=1606116039145-add_random-id_to_messages.js.map