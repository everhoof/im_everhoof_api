"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addForeignKeysAndUniqueIndexesToUsersTable1616847453379 = void 0;
const typeorm_1 = require("typeorm");
class addForeignKeysAndUniqueIndexesToUsersTable1616847453379 {
    async up(queryRunner) {
        await queryRunner.createForeignKey('users', new typeorm_1.TableForeignKey({
            name: 'users_foreign_owner_id',
            columnNames: ['avatar_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pictures',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createUniqueConstraint('users', new typeorm_1.TableUnique({
            name: 'users_unique_email',
            columnNames: ['email'],
        }));
        await queryRunner.createUniqueConstraint('users', new typeorm_1.TableUnique({
            name: 'users_unique_username',
            columnNames: ['username'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('users', 'users_foreign_owner_id');
        await queryRunner.dropUniqueConstraint('users', 'users_unique_email');
        await queryRunner.dropUniqueConstraint('users', 'users_unique_username');
    }
}
exports.addForeignKeysAndUniqueIndexesToUsersTable1616847453379 = addForeignKeysAndUniqueIndexesToUsersTable1616847453379;
//# sourceMappingURL=1616847453379-add_foreign_keys_and_unique_indexes_to_users_table.js.map