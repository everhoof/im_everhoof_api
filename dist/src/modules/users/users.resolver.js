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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const users_entity_1 = require("./entities/users.entity");
const auth_guard_1 = require("../../common/guards/auth.guard");
const pictures_entity_1 = require("../pictures/entities/pictures.entity");
const pictures_loader_1 = require("../pictures/loaders/pictures.loader");
const nestjs_graphql_dataloader_1 = require("@intelrug/nestjs-graphql-dataloader");
const dataloader_1 = __importDefault(require("dataloader"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const users_service_1 = require("./users.service");
let UsersResolver = class UsersResolver {
    constructor(pubSub, usersService) {
        this.pubSub = pubSub;
        this.usersService = usersService;
    }
    async avatar(user, picturesLoader) {
        if (user.avatarId) {
            return picturesLoader.load(user.avatarId);
        }
        return null;
    }
    async getCurrentUser(user) {
        return user;
    }
    async getOnline() {
        return this.usersService.getOnline();
    }
    async updateOnlineStatus() {
        await this.usersService.updateOnlineStatus();
        return true;
    }
    onlineUpdated() {
        return this.pubSub.asyncIterator('onlineUpdated');
    }
};
__decorate([
    graphql_1.ResolveField(() => pictures_entity_1.Picture, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(pictures_loader_1.PicturesLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "avatar", null);
__decorate([
    graphql_1.Query(() => users_entity_1.User),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getCurrentUser", null);
__decorate([
    graphql_1.Query(() => [users_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getOnline", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateOnlineStatus", null);
__decorate([
    graphql_1.Subscription(() => [users_entity_1.User], {
        name: 'onlineUpdated',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UsersResolver.prototype, "onlineUpdated", null);
UsersResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    graphql_1.Resolver(() => users_entity_1.User),
    __param(0, common_1.Inject('PUB_SUB')),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub, users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map