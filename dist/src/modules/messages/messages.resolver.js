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
exports.MessagesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const pictures_entity_1 = require("../pictures/entities/pictures.entity");
const messages_entity_1 = require("./entities/messages.entity");
const nestjs_graphql_dataloader_1 = require("@intelrug/nestjs-graphql-dataloader");
const dataloader_1 = __importDefault(require("dataloader"));
const pictures_loader_1 = require("../pictures/loaders/pictures.loader");
const messages_service_1 = require("./messages.service");
const create_message_args_1 = require("./args/create-message.args");
const auth_guard_1 = require("../../common/guards/auth.guard");
const users_entity_1 = require("../users/entities/users.entity");
const get_messages_args_1 = require("./args/get-messages.args");
const users_loader_1 = require("../users/loaders/users.loader");
let MessagesResolver = class MessagesResolver {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async owner(message, usersLoader) {
        if (message.ownerId) {
            return usersLoader.load(message.ownerId);
        }
        return null;
    }
    async pictures(message, picturesLoader) {
        return picturesLoader.loadMany(message.pictureIds);
    }
    createMessage(args, user) {
        return this.messagesService.createMessage(args, user);
    }
    getMessages(args) {
        return this.messagesService.getMessages(args);
    }
};
__decorate([
    graphql_1.ResolveField(() => users_entity_1.User),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(users_loader_1.UsersLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messages_entity_1.Message,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "owner", null);
__decorate([
    graphql_1.ResolveField(() => [pictures_entity_1.Picture]),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(pictures_loader_1.PicturesLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messages_entity_1.Message,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "pictures", null);
__decorate([
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    graphql_1.Mutation(() => messages_entity_1.Message),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_args_1.CreateMessageArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "createMessage", null);
__decorate([
    graphql_1.Query(() => [messages_entity_1.Message]),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_messages_args_1.GetMessagesArgs]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "getMessages", null);
MessagesResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter),
    graphql_1.Resolver(() => messages_entity_1.Message),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesResolver);
exports.MessagesResolver = MessagesResolver;
//# sourceMappingURL=messages.resolver.js.map