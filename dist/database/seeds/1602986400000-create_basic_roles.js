"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBasicRoles1602986400000 = void 0;
class CreateBasicRoles1602986400000 {
    async up(queryRunner) {
        await queryRunner.query('INSERT INTO `roles` (`name`) VALUES (?), (?), (?), (?)', [
            'UNVERIFIED_USER',
            'USER',
            'MODERATOR',
            'ADMIN',
        ]);
    }
    async down(queryRunner) {
        await queryRunner.query('DELETE FROM `roles` WHERE `name` = ? OR `name` = ? OR `name` = ? OR `name` = ?', [
            'UNVERIFIED_USER',
            'USER',
            'MODERATOR',
            'ADMIN',
        ]);
    }
}
exports.CreateBasicRoles1602986400000 = CreateBasicRoles1602986400000;
//# sourceMappingURL=1602986400000-create_basic_roles.js.map