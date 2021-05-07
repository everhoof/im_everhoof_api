"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../users/entities/users.entity");
const oauth_type_enum_1 = require("../types/oauth-type.enum");
let OAuth = class OAuth {
};
__decorate([
    typeorm_1.PrimaryColumn({
        type: 'int',
        generated: 'increment',
    }),
    __metadata("design:type", Number)
], OAuth.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        name: 'access_token',
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], OAuth.prototype, "accessToken", void 0);
__decorate([
    typeorm_1.Column({
        name: 'refresh_token',
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], OAuth.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        name: 'user_id',
        unsigned: true,
        width: 10,
    }),
    __metadata("design:type", Number)
], OAuth.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], OAuth.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, (user) => user.tokens, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.User)
], OAuth.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        name: 'external_id',
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], OAuth.prototype, "externalId", void 0);
__decorate([
    typeorm_1.Column({
        name: 'data',
        type: 'jsonb',
    }),
    __metadata("design:type", Object)
], OAuth.prototype, "data", void 0);
OAuth = __decorate([
    typeorm_1.Entity('oauth'),
    typeorm_1.Index('oauth_user_id_index', ['userId'])
], OAuth);
exports.OAuth = OAuth;
//# sourceMappingURL=oauth.entity.js.map