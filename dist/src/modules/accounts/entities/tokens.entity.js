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
exports.Token = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const users_entity_1 = require("../../users/entities/users.entity");
let Token = class Token {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.PrimaryColumn({
        type: 'int',
        generated: 'increment',
        unsigned: true,
        width: 10,
    }),
    __metadata("design:type", Number)
], Token.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({
        type: 'varchar',
        length: 64,
    }),
    __metadata("design:type", String)
], Token.prototype, "value", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({
        type: 'int',
        name: 'owner_id',
        unsigned: true,
        width: 10,
    }),
    __metadata("design:type", Number)
], Token.prototype, "ownerId", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Token.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    typeorm_1.Column({
        name: 'expires_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Token.prototype, "expiresAt", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    typeorm_1.Column({
        name: 'used_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Token.prototype, "usedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, (user) => user.tokens, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({
        name: 'owner_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.User)
], Token.prototype, "owner", void 0);
Token = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('tokens')
], Token);
exports.Token = Token;
//# sourceMappingURL=tokens.entity.js.map