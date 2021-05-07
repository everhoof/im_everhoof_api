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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const tokens_entity_1 = require("../../accounts/entities/tokens.entity");
const roles_entity_1 = require("../../roles/entities/roles.entity");
const messages_entity_1 = require("../../messages/entities/messages.entity");
const pictures_entity_1 = require("../../pictures/entities/pictures.entity");
const punishments_entity_1 = require("./punishments.entity");
const confirmations_entity_1 = require("../../accounts/entities/confirmations.entity");
let User = class User {
    get roleNames() {
        if (!this.roles)
            return [];
        return this.roles.map(({ name }) => name);
    }
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
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        length: 254,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({
        type: 'varchar',
        length: 32,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({
        name: 'avatar_id',
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "avatarId", void 0);
__decorate([
    typeorm_1.Column({
        length: 64,
        select: false,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({
        length: 64,
        select: false,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "hash", void 0);
__decorate([
    typeorm_1.Column({
        name: 'email_confirmed',
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "emailConfirmed", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    typeorm_1.Column({
        name: 'was_online_at',
        nullable: true,
    }),
    __metadata("design:type", Date)
], User.prototype, "wasOnlineAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => tokens_entity_1.Token, ({ owner }) => owner),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
__decorate([
    typeorm_1.ManyToOne(() => pictures_entity_1.Picture, ({ avatars }) => avatars, { onDelete: 'SET NULL' }),
    typeorm_1.JoinColumn({
        name: 'avatar_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.OneToMany(() => tokens_entity_1.Token, ({ owner }) => owner),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    typeorm_1.OneToMany(() => pictures_entity_1.Picture, ({ owner }) => owner),
    __metadata("design:type", Array)
], User.prototype, "pictures", void 0);
__decorate([
    typeorm_1.OneToMany(() => punishments_entity_1.Punishment, ({ target }) => target),
    __metadata("design:type", Array)
], User.prototype, "punishments", void 0);
__decorate([
    typeorm_1.OneToMany(() => punishments_entity_1.Punishment, ({ executor }) => executor),
    __metadata("design:type", Array)
], User.prototype, "executedPunishments", void 0);
__decorate([
    typeorm_1.OneToMany(() => punishments_entity_1.Punishment, ({ canceledBy }) => canceledBy),
    __metadata("design:type", Array)
], User.prototype, "canceledPunishments", void 0);
__decorate([
    typeorm_1.OneToMany(() => confirmations_entity_1.Confirmation, ({ user }) => user),
    __metadata("design:type", Array)
], User.prototype, "confirmations", void 0);
__decorate([
    graphql_1.Field(() => [roles_entity_1.Role]),
    typeorm_1.ManyToMany(() => roles_entity_1.Role, ({ users }) => users, { eager: true }),
    typeorm_1.JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('users'),
    typeorm_1.Unique('users_unique_email', ['email']),
    typeorm_1.Unique('users_unique_username', ['username'])
], User);
exports.User = User;
//# sourceMappingURL=users.entity.js.map