"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRolesTable1602990000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserRolesTable1602990000000 {
    constructor() {
        this.name = 'CreateUserRolesTable1602990000000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_roles',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    unsigned: true,
                    width: 10,
                },
                {
                    name: 'role_id',
                    type: 'int',
                    unsigned: true,
                    width: 10,
                },
            ],
        }));
        await queryRunner.createPrimaryKey('user_roles', ['user_id', 'role_id']);
        await queryRunner.createIndex('user_roles', new typeorm_1.TableIndex({
            name: 'user_roles_index_user_id',
            columnNames: ['user_id'],
        }));
        await queryRunner.createIndex('user_roles', new typeorm_1.TableIndex({
            name: 'user_roles_index_role_id',
            columnNames: ['role_id'],
        }));
        await queryRunner.createForeignKey('user_roles', new typeorm_1.TableForeignKey({
            name: 'user_roles_foreign_user_id',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
        }));
        await queryRunner.createForeignKey('user_roles', new typeorm_1.TableForeignKey({
            name: 'user_roles_foreign_role_id',
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('user_roles', 'user_roles_foreign_user_id');
        await queryRunner.dropForeignKey('user_roles', 'user_roles_foreign_role_id');
        await queryRunner.dropTable('user_roles');
    }
}
exports.CreateUserRolesTable1602990000000 = CreateUserRolesTable1602990000000;
//# sourceMappingURL=1602990000000-create_user_roles_table.js.map