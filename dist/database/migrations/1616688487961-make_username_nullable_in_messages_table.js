"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUsernameNullableInMessagesTable1616688487961 = void 0;
class makeUsernameNullableInMessagesTable1616688487961 {
    async up(queryRunner) {
        if ('schema' in queryRunner.connection.options) {
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".messages ALTER COLUMN username DROP NOT NULL`);
        }
    }
    async down(queryRunner) {
        if ('schema' in queryRunner.connection.options) {
            await queryRunner.query(`UPDATE "${queryRunner.connection.options.schema}".messages SET username = 'unknown' WHERE username IS NULL`);
            await queryRunner.query(`ALTER TABLE "${queryRunner.connection.options.schema}".messages ALTER COLUMN username SET NOT NULL`);
        }
    }
}
exports.makeUsernameNullableInMessagesTable1616688487961 = makeUsernameNullableInMessagesTable1616688487961;
//# sourceMappingURL=1616688487961-make_username_nullable_in_messages_table.js.map