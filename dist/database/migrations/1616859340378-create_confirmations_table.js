"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfirmationsTable1616859340378 = void 0;
const typeorm_1 = require("typeorm");
class createConfirmationsTable1616859340378 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'confirmations',
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
                    unsigned: true,
                },
                {
                    name: 'user_id',
                    type: 'int',
                    width: 10,
                    unsigned: true,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '16',
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createForeignKey('confirmations', new typeorm_1.TableForeignKey({
            name: 'confirmations_foreign_user_id',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createUniqueConstraint('confirmations', new typeorm_1.TableUnique({
            name: 'confirmations_unique_value',
            columnNames: ['value'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropUniqueConstraint('confirmations', 'confirmations_unique_value');
        await queryRunner.dropForeignKey('confirmations', 'confirmations_foreign_user_id');
        await queryRunner.dropTable('confirmations');
    }
}
exports.createConfirmationsTable1616859340378 = createConfirmationsTable1616859340378;
//# sourceMappingURL=1616859340378-create_confirmations_table.js.map