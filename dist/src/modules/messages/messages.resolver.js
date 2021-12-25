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
const graphql_subscriptions_1 = require("graphql-subscriptions");
const delete_message_args_1 = require("./args/delete-message.args");
const access_control_guard_1 = require("../../common/guards/access-control.guard");
const throttler_1 = require("@nestjs/throttler");
const throttler_guard_1 = require("../../common/guards/throttler.guard");
const update_message_args_1 = require("./args/update-message.args");
let MessagesResolver = class MessagesResolver {
    constructor(pubSub, messagesService) {
        this.pubSub = pubSub;
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
    async deletedBy(message, usersLoader) {
        if (message.deletedById) {
            return usersLoader.load(message.deletedById);
        }
        return null;
    }
    async updateMessage(args, user) {
        const message = await this.messagesService.updateMessage(args, user);
        await this.pubSub.publish('messageUpdated', { messageUpdated: message });
        return message;
    }
    async createMessage(args, user) {
        const message = await this.messagesService.createMessage(args, user);
        await this.pubSub.publish('messageCreated', { messageCreated: message });
        return message;
    }
    getMessages(args, user) {
        return this.messagesService.getMessages(args, user);
    }
    async deleteMessage(args, user) {
        const message = await this.messagesService.deleteMessage(args, user);
        await this.pubSub.publish('messageDeleted', { messageDeleted: message });
        return message;
    }
    messageCreated() {
        return this.pubSub.asyncIterator('messageCreated');
    }
    messageDeleted() {
        return this.pubSub.asyncIterator('messageDeleted');
    }
    messageUpdated() {
        return this.pubSub.asyncIterator('messageUpdated');
    }
};
__decorate([
    graphql_1.ResolveField(() => users_entity_1.User, { nullable: true }),
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
    graphql_1.ResolveField(() => users_entity_1.User, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __param(1, nestjs_graphql_dataloader_1.Loader(users_loader_1.UsersLoader)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messages_entity_1.Message,
        dataloader_1.default]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "deletedBy", null);
__decorate([
    throttler_1.Throttle(5, 20),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    graphql_1.Mutation(() => messages_entity_1.Message),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_args_1.UpdateMessageArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "updateMessage", null);
__decorate([
    throttler_1.Throttle(5, 20),
    common_1.UseGuards(throttler_guard_1.GqlThrottlerGuard),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    graphql_1.Mutation(() => messages_entity_1.Message),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_args_1.CreateMessageArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "createMessage", null);
__decorate([
    common_1.UseGuards(auth_guard_1.OptionalGqlAuthGuard, access_control_guard_1.ACGuard),
    graphql_1.Query(() => [messages_entity_1.Message]),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_messages_args_1.GetMessagesArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "getMessages", null);
__decorate([
    throttler_1.Throttle(5, 20),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    graphql_1.Mutation(() => messages_entity_1.Message),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_message_args_1.DeleteMessageArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "deleteMessage", null);
__decorate([
    graphql_1.Subscription(() => messages_entity_1.Message, {
        name: 'messageCreated',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MessagesResolver.prototype, "messageCreated", null);
__decorate([
    graphql_1.Subscription(() => messages_entity_1.Message, {
        name: 'messageDeleted',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MessagesResolver.prototype, "messageDeleted", null);
__decorate([
    graphql_1.Subscription(() => messages_entity_1.Message, {
        name: 'messageUpdated',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MessagesResolver.prototype, "messageUpdated", null);
MessagesResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter, http_exception_filter_1.ThrottlerExceptionFilter),
    graphql_1.Resolver(() => messages_entity_1.Message),
    __param(0, common_1.Inject('PUB_SUB')),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub, messages_service_1.MessagesService])
], MessagesResolver);
exports.MessagesResolver = MessagesResolver;
//# sourceMappingURL=messages.resolver.js.map