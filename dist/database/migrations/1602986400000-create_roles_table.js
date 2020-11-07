"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRolesTable1602986400000 = void 0;
const typeorm_1 = require("typeorm");
class CreateRolesTable1602986400000 {
    constructor() {
        this.name = 'CreateRolesTable1602986400000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    unsigned: true,
                    width: 10,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '254',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('roles');
    }
}
exports.CreateRolesTable1602986400000 = CreateRolesTable1602986400000;
//# sourceMappingURL=1602986400000-create_roles_table.js.map