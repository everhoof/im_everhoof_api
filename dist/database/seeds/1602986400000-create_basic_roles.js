"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBasicRoles1602986400000 = void 0;
class CreateBasicRoles1602986400000 {
    async up(queryRunner) {
        const roles = ['UNVERIFIED_USER', 'USER', 'MODERATOR', 'ADMIN'];
        for (const role of roles) {
            await queryRunner.query('INSERT INTO "im".roles (name) VALUES ($1)', [role]);
        }
    }
    async down(queryRunner) {
        const roles = ['UNVERIFIED_USER', 'USER', 'MODERATOR', 'ADMIN'];
        for (const role of roles) {
            await queryRunner.query('DELETE FROM "im".roles WHERE name = $1', [role]);
        }
    }
}
exports.CreateBasicRoles1602986400000 = CreateBasicRoles1602986400000;
//# sourceMappingURL=1602986400000-create_basic_roles.js.map