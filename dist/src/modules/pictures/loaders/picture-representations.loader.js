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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureRepresentationsLoader = void 0;
const common_1 = require("@nestjs/common");
const nestjs_graphql_dataloader_1 = require("@intelrug/nestjs-graphql-dataloader");
const typeorm_1 = require("@nestjs/typeorm");
const picture_representations_entity_1 = require("../entities/picture-representations.entity");
const picture_representations_repository_1 = require("../repositories/picture-representations.repository");
let PictureRepresentationsLoader = class PictureRepresentationsLoader extends nestjs_graphql_dataloader_1.OrderedNestDataLoader {
    constructor(pictureRepresentationsRepository) {
        super();
        this.pictureRepresentationsRepository = pictureRepresentationsRepository;
        this.getOptions = () => ({
            query: (keys) => this.pictureRepresentationsRepository.findByIds(keys),
        });
    }
};
PictureRepresentationsLoader = __decorate([
    common_1.Injectable({ scope: common_1.Scope.REQUEST }),
    __param(0, typeorm_1.InjectRepository(picture_representations_repository_1.PictureRepresentationsRepository)),
    __metadata("design:paramtypes", [picture_representations_repository_1.PictureRepresentationsRepository])
], PictureRepresentationsLoader);
exports.PictureRepresentationsLoader = PictureRepresentationsLoader;
//# sourceMappingURL=picture-representations.loader.js.map