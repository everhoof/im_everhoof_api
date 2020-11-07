"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePictureRepresentationsTable1604707200000 = void 0;
const typeorm_1 = require("typeorm");
class CreatePictureRepresentationsTable1604707200000 {
    constructor() {
        this.name = 'CreatePictureRepresentationsTable1604707200000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'picture_representations',
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
                    name: 'height',
                    type: 'smallint',
                    width: 5,
                    unsigned: true,
                },
                {
                    name: 'width',
                    type: 'smallint',
                    width: 5,
                    unsigned: true,
                },
                {
                    name: 'size',
                    type: 'int',
                    width: 10,
                    unsigned: true,
                },
                {
                    name: 'path',
                    type: 'varchar',
                    length: '191',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('picture_representations');
    }
}
exports.CreatePictureRepresentationsTable1604707200000 = CreatePictureRepresentationsTable1604707200000;
//# sourceMappingURL=1604707200000-create_picture_representations_table.js.map