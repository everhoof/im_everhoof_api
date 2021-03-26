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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const users_entity_1 = require("../../users/entities/users.entity");
const pictures_entity_1 = require("../../pictures/entities/pictures.entity");
let Message = class Message {
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
], Message.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => Number, { nullable: true }),
    typeorm_1.Column({
        name: 'owner_id',
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "ownerId", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({
        name: 'random_id',
        type: 'varchar',
        length: 32,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "randomId", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    typeorm_1.Column({
        name: 'system',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Message.prototype, "system", void 0);
__decorate([
    graphql_1.Field(() => String),
    typeorm_1.Column({
        type: 'text',
    }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    typeorm_1.Column({
        type: 'varchar',
        length: 32,
    }),
    __metadata("design:type", String)
], Message.prototype, "username", void 0);
__decorate([
    graphql_1.Field(() => Number, { nullable: true }),
    typeorm_1.Column({
        name: 'deleted_by_id',
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "deletedById", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Index('messages_idx_deleted_at'),
    graphql_1.Field(() => Date, { nullable: true }),
    typeorm_1.Column({
        type: 'timestamp with time zone',
        name: 'deleted_at',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Message.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.RelationId((message) => message.pictures),
    __metadata("design:type", Array)
], Message.prototype, "pictureIds", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, ({ messages }) => messages, { onDelete: 'SET NULL' }),
    typeorm_1.JoinColumn({
        name: 'owner_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.User)
], Message.prototype, "owner", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, ({ messages }) => messages, { onDelete: 'SET NULL' }),
    typeorm_1.JoinColumn({
        name: 'deleted_by_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.User)
], Message.prototype, "deletedBy", void 0);
__decorate([
    typeorm_1.ManyToMany(() => pictures_entity_1.Picture, ({ messages }) => messages),
    typeorm_1.JoinTable({
        name: 'message_pictures',
        joinColumn: {
            name: 'message_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'picture_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Message.prototype, "pictures", void 0);
Message = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('messages')
], Message);
exports.Message = Message;
//# sourceMappingURL=messages.entity.js.map