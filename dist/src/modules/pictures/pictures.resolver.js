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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicturesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const pictures_entity_1 = require("./entities/pictures.entity");
const pictures_service_1 = require("./pictures.service");
const picture_representations_entity_1 = require("./entities/picture-representations.entity");
const picture_representations_loader_1 = require("./loaders/picture-representations.loader");
const dataloader_1 = __importDefault(require("dataloader"));
const nestjs_graphql_dataloader_1 = require("@intelrug/nestjs-graphql-dataloader");
const get_picture_by_id_args_1 = require("./args/get-picture-by-id.args");
const users_loader_1 = require("../users/loaders/users.loader");
const users_entity_1 = require("../users/entities/users.entity");
let PicturesResolver = class PicturesResolver {
    constructor(picturesService) {
        this.picturesService = picturesService;
    }
    async owner(picture, usersLoader) {
        if (picture.ownerId) {
            return usersLoader.load(picture.ownerId);
        }
        return null;
    }
    async s(picture, pictureRepresentationsLoader) {
        return pictureRepresentationsLoader.load(picture.sId);
    }
    async m(picture, pictureRepresentationsLoader) {
        return pictureRepresentationsLoader.load(picture.mId);
    }
    async o(picture, pictureRepresentationsLoader) {
        return pictureRepresentationsLoader.load(picture.oId);
    }
    getPictureById(args) {
        return this.picturesService.getPictureById(args);
    }
};
__decorate([
    graphql_1.ResolveField(() => users_entity_1.User),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(users_loader_1.UsersLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pictures_entity_1.Picture,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], PicturesResolver.prototype, "owner", null);
__decorate([
    graphql_1.ResolveField(() => picture_representations_entity_1.PictureRepresentation),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(picture_representations_loader_1.PictureRepresentationsLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pictures_entity_1.Picture,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], PicturesResolver.prototype, "s", null);
__decorate([
    graphql_1.ResolveField(() => picture_representations_entity_1.PictureRepresentation),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(picture_representations_loader_1.PictureRepresentationsLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pictures_entity_1.Picture,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], PicturesResolver.prototype, "m", null);
__decorate([
    graphql_1.ResolveField(() => picture_representations_entity_1.PictureRepresentation),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(picture_representations_loader_1.PictureRepresentationsLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pictures_entity_1.Picture,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], PicturesResolver.prototype, "o", null);
__decorate([
    graphql_1.Query(() => pictures_entity_1.Picture),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_picture_by_id_args_1.GetPictureByIdArgs]),
    __metadata("design:returntype", Promise)
], PicturesResolver.prototype, "getPictureById", null);
PicturesResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter, http_exception_filter_1.ThrottlerExceptionFilter),
    graphql_1.Resolver(() => pictures_entity_1.Picture),
    __metadata("design:paramtypes", [pictures_service_1.PicturesService])
], PicturesResolver);
exports.PicturesResolver = PicturesResolver;
//# sourceMappingURL=pictures.resolver.js.map