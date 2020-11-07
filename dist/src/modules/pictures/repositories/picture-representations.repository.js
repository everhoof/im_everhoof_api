"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureRepresentationsRepository = void 0;
const typeorm_1 = require("typeorm");
const picture_representations_entity_1 = require("../entities/picture-representations.entity");
const basic_repository_1 = require("../../../common/repositories/basic.repository");
let PictureRepresentationsRepository = class PictureRepresentationsRepository extends basic_repository_1.BasicRepository {
};
PictureRepresentationsRepository = __decorate([
    typeorm_1.EntityRepository(picture_representations_entity_1.PictureRepresentation)
], PictureRepresentationsRepository);
exports.PictureRepresentationsRepository = PictureRepresentationsRepository;
//# sourceMappingURL=picture-representations.repository.js.map