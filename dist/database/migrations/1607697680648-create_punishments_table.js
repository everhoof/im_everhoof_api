"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPunishmentsTable1607697680648 = void 0;
const typeorm_1 = require("typeorm");
class createPunishmentsTable1607697680648 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'punishments',
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
                    name: 'target_id',
                    type: 'int',
                    width: 10,
                    unsigned: true,
                },
                {
                    name: 'executor_id',
                    type: 'int',
                    width: 10,
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'canceled_by_id',
                    type: 'int',
                    width: 10,
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '16',
                },
                {
                    name: 'reason',
                    type: 'varchar',
                    length: '200',
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'cancel_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
                {
                    name: 'canceled_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createForeignKey('punishments', new typeorm_1.TableForeignKey({
            name: 'punishments_foreign_target_id',
            columnNames: ['target_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('punishments', new typeorm_1.TableForeignKey({
            name: 'punishments_foreign_executor_id',
            columnNames: ['executor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('punishments', new typeorm_1.TableForeignKey({
            name: 'punishments_foreign_canceled_by_id',
            columnNames: ['canceled_by_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('punishments', 'punishments_foreign_canceled_by_id');
        await queryRunner.dropForeignKey('punishments', 'punishments_foreign_executor_id');
        await queryRunner.dropForeignKey('punishments', 'punishments_foreign_target_id');
        await queryRunner.dropTable('punishments');
    }
}
exports.createPunishmentsTable1607697680648 = createPunishmentsTable1607697680648;
//# sourceMappingURL=1607697680648-create_punishments_table.js.map