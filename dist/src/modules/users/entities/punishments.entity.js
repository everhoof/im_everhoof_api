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
exports.Punishment = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const users_entity_1 = require("./users.entity");
const punishment_args_1 = require("../args/punishment.args");
let Punishment = class Punishment {
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
], Punishment.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({
        name: 'user_id',
        type: 'int',
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Punishment.prototype, "targetId", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    typeorm_1.Column({
        name: 'executor_id',
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Punishment.prototype, "executorId", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    typeorm_1.Column({
        name: 'canceled_by_id',
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Punishment.prototype, "canceledById", void 0);
__decorate([
    graphql_1.Field(() => punishment_args_1.PunishmentTypes),
    typeorm_1.Column({
        type: 'varchar',
        length: 16,
    }),
    __metadata("design:type", String)
], Punishment.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], Punishment.prototype, "reason", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Punishment.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    typeorm_1.Column({
        type: 'timestamp with time zone',
        name: 'cancel_at',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Punishment.prototype, "cancelAt", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    typeorm_1.Column({
        type: 'timestamp with time zone',
        name: 'canceled_at',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Punishment.prototype, "canceledAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, ({ punishments }) => punishments, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({
        name: 'target_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.User)
], Punishment.prototype, "target", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, ({ executedPunishments }) => executedPunishments, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({
        name: 'executor_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], Punishment.prototype, "executor", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, ({ canceledPunishments }) => canceledPunishments, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({
        name: 'canceled_by_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], Punishment.prototype, "canceledBy", void 0);
Punishment = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('punishments')
], Punishment);
exports.Punishment = Punishment;
//# sourceMappingURL=punishments.entity.js.map