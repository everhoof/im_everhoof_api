"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmailConfirmedToUsersTable1616862144678 = void 0;
const typeorm_1 = require("typeorm");
class addEmailConfirmedToUsersTable1616862144678 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'email_confirmed',
            type: 'boolean',
            default: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('users', 'email_confirmed');
    }
}
exports.addEmailConfirmedToUsersTable1616862144678 = addEmailConfirmedToUsersTable1616862144678;
//# sourceMappingURL=1616862144678-add_email_confirmed_to_users_table.js.map