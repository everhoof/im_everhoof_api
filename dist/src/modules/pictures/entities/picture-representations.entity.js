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
exports.PictureRepresentation = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const pictures_entity_1 = require("./pictures.entity");
let PictureRepresentation = class PictureRepresentation {
    setLink() {
        this.link = !/^http/.test(this.path) ? process.env.CDN_URL + this.path : this.path;
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    typeorm_1.PrimaryColumn({
        type: 'int',
        generated: 'increment',
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], PictureRepresentation.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column({
        type: 'smallint',
        width: 5,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], PictureRepresentation.prototype, "height", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column({
        type: 'smallint',
        width: 5,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], PictureRepresentation.prototype, "width", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column({
        width: 10,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], PictureRepresentation.prototype, "size", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column({
        type: 'varchar',
        length: 191,
    }),
    __metadata("design:type", String)
], PictureRepresentation.prototype, "path", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], PictureRepresentation.prototype, "link", void 0);
__decorate([
    typeorm_1.OneToOne(() => pictures_entity_1.Picture, ({ s }) => s),
    __metadata("design:type", pictures_entity_1.Picture)
], PictureRepresentation.prototype, "sPack", void 0);
__decorate([
    typeorm_1.OneToOne(() => pictures_entity_1.Picture, ({ m }) => m),
    __metadata("design:type", pictures_entity_1.Picture)
], PictureRepresentation.prototype, "mPack", void 0);
__decorate([
    typeorm_1.OneToOne(() => pictures_entity_1.Picture, ({ o }) => o),
    __metadata("design:type", pictures_entity_1.Picture)
], PictureRepresentation.prototype, "oPack", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PictureRepresentation.prototype, "setLink", null);
PictureRepresentation = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity('picture_representations')
], PictureRepresentation);
exports.PictureRepresentation = PictureRepresentation;
//# sourceMappingURL=picture-representations.entity.js.map