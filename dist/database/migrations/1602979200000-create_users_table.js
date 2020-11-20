"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1602979200000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1602979200000 {
    constructor() {
        this.name = 'CreateUsersTable1602979200000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
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
                    name: 'email',
                    type: 'varchar',
                    length: '254',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '32',
                },
                {
                    name: 'avatar_id',
                    type: 'int',
                    width: 10,
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'salt',
                    type: 'varchar',
                    length: '64',
                },
                {
                    name: 'hash',
                    type: 'varchar',
                    length: '64',
                },
                {
                    name: 'was_online_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1602979200000 = CreateUsersTable1602979200000;
//# sourceMappingURL=1602979200000-create_users_table.js.map