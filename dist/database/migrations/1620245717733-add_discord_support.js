"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiscordSupport1620245717733 = void 0;
const typeorm_1 = require("typeorm");
class addDiscordSupport1620245717733 {
    constructor() {
        this.name = 'addDiscordSupport1620245717733';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'oauth',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'access_token',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'refresh_token',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    unsigned: true,
                    width: 10,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '32',
                },
                {
                    name: 'external_id',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'data',
                    type: 'jsonb',
                },
            ],
        }));
        if ('schema' in queryRunner.connection.options) {
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN hash DROP NOT NULL`);
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN salt DROP NOT NULL`);
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN username DROP NOT NULL`);
        }
        await queryRunner.createIndex('oauth', new typeorm_1.TableIndex({
            name: 'oauth_user_id_index',
            columnNames: ['user_id'],
        }));
        await queryRunner.createForeignKey('oauth', new typeorm_1.TableForeignKey({
            name: 'oauth_user_id_foreign',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        if ('schema' in queryRunner.connection.options) {
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN hash SET NOT NULL`);
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN salt SET NOT NULL`);
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".users ALTER COLUMN username SET NOT NULL`);
        }
        await queryRunner.dropTable('oauth');
    }
}
exports.addDiscordSupport1620245717733 = addDiscordSupport1620245717733;
//# sourceMappingURL=1620245717733-add_discord_support.js.map