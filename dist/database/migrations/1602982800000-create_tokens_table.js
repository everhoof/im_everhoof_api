"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokensTable1602982800000 = void 0;
const typeorm_1 = require("typeorm");
class CreateTokensTable1602982800000 {
    constructor() {
        this.name = 'CreateTokensTable1602982800000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'tokens',
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
                    name: 'value',
                    type: 'varchar',
                    length: '64',
                },
                {
                    name: 'owner_id',
                    type: 'int',
                    unsigned: true,
                    width: 10,
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'expires_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
                {
                    name: 'used_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createForeignKey('tokens', new typeorm_1.TableForeignKey({
            name: 'tokens_foreign_owner_id',
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('tokens', 'tokens_foreign_owner_id');
        await queryRunner.dropTable('tokens');
    }
}
exports.CreateTokensTable1602982800000 = CreateTokensTable1602982800000;
//# sourceMappingURL=1602982800000-create_tokens_table.js.map