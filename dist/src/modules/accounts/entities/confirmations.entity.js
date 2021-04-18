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
exports.Confirmation = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const confirmation_type_enum_1 = require("../types/confirmation-type.enum");
const users_entity_1 = require("../../users/entities/users.entity");
graphql_1.registerEnumType(confirmation_type_enum_1.ConfirmationType, { name: 'ConfirmationType' });
let Confirmation = class Confirmation {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.PrimaryColumn({
        type: 'int',
        width: 10,
        generated: 'increment',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Confirmation.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({
        type: 'varchar',
        length: 64,
    }),
    __metadata("design:type", String)
], Confirmation.prototype, "value", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({
        name: 'user_id',
        type: 'int',
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Confirmation.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => confirmation_type_enum_1.ConfirmationType),
    typeorm_1.Column({
        type: 'varchar',
        length: '16',
    }),
    __metadata("design:type", String)
], Confirmation.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Confirmation.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, (user) => user.confirmations, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.User)
], Confirmation.prototype, "user", void 0);
Confirmation = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('confirmations'),
    typeorm_1.Unique('confirmations_unique_value', ['value'])
], Confirmation);
exports.Confirmation = Confirmation;
//# sourceMappingURL=confirmations.entity.js.map