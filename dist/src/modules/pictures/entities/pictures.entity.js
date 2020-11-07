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
exports.Picture = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const picture_representations_entity_1 = require("./picture-representations.entity");
const users_entity_1 = require("../../users/entities/users.entity");
const messages_entity_1 = require("../../messages/entities/messages.entity");
let Picture = class Picture {
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
], Picture.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    typeorm_1.Column({
        name: 'owner_id',
        type: 'int',
        width: 10,
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Picture.prototype, "ownerId", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({
        name: 's_id',
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Picture.prototype, "sId", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({
        name: 'm_id',
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Picture.prototype, "mId", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.Column({
        name: 'o_id',
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Picture.prototype, "oId", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
    }),
    __metadata("design:type", Date)
], Picture.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn({
        name: 'updated_at',
        type: 'datetime',
    }),
    __metadata("design:type", Date)
], Picture.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToOne(() => picture_representations_entity_1.PictureRepresentation, ({ sPack }) => sPack),
    typeorm_1.JoinColumn({
        name: 's_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", picture_representations_entity_1.PictureRepresentation)
], Picture.prototype, "s", void 0);
__decorate([
    typeorm_1.OneToOne(() => picture_representations_entity_1.PictureRepresentation, ({ mPack }) => mPack),
    typeorm_1.JoinColumn({
        name: 'm_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", picture_representations_entity_1.PictureRepresentation)
], Picture.prototype, "m", void 0);
__decorate([
    typeorm_1.OneToOne(() => picture_representations_entity_1.PictureRepresentation, ({ oPack }) => oPack),
    typeorm_1.JoinColumn({
        name: 'o_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", picture_representations_entity_1.PictureRepresentation)
], Picture.prototype, "o", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, ({ pictures }) => pictures, { onDelete: 'SET NULL' }),
    typeorm_1.JoinColumn({
        name: 'owner_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], Picture.prototype, "owner", void 0);
__decorate([
    typeorm_1.OneToMany(() => users_entity_1.User, ({ avatar }) => avatar),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], Picture.prototype, "avatars", void 0);
__decorate([
    typeorm_1.ManyToMany(() => messages_entity_1.Message, ({ pictures }) => pictures),
    __metadata("design:type", Array)
], Picture.prototype, "messages", void 0);
Picture = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('pictures')
], Picture);
exports.Picture = Picture;
//# sourceMappingURL=pictures.entity.js.map