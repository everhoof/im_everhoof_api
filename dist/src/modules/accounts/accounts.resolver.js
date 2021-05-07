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
exports.AccountsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const accounts_service_1 = require("./accounts.service");
const tokens_entity_1 = require("./entities/tokens.entity");
const sign_in_args_1 = require("./args/sign-in.args");
const users_entity_1 = require("../users/entities/users.entity");
const sign_up_args_1 = require("./args/sign-up.args");
const confirm_email_args_1 = require("./args/confirm-email.args");
const reset_password_args_1 = require("./args/reset-password.args");
const auth_guard_1 = require("../../common/guards/auth.guard");
const is_username_free_args_1 = require("./args/is-username-free.args");
const update_username_args_1 = require("./args/update-username.args");
const subscription_events_1 = require("../common/types/subscription-events");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const app_roles_1 = require("../../app.roles");
const get_token_by_discord_id_args_1 = require("./args/get-token-by-discord-id.args");
const exceptions_1 = require("../../common/exceptions/exceptions");
let AccountsResolver = class AccountsResolver {
    constructor(pubSub, accountsService) {
        this.pubSub = pubSub;
        this.accountsService = accountsService;
    }
    async signIn(args) {
        return this.accountsService.validateUserByEmailAndPassword(args);
    }
    async signUp(args) {
        return this.accountsService.createUser(args);
    }
    async confirmEmail(args) {
        return this.accountsService.confirmEmail(args);
    }
    async requestEmailConfirmation(user) {
        return this.accountsService.requestEmailConfirmation(user);
    }
    async requestPasswordReset(args) {
        return this.accountsService.requestPasswordReset(args);
    }
    async resetPassword(args) {
        return this.accountsService.resetPassword(args);
    }
    async updateUsername(args, user) {
        return this.accountsService.updateUsername(args, user);
    }
    isUsernameFree(args) {
        return this.accountsService.isUsernameFree(args);
    }
    getTokenByDiscordId(args, user) {
        if (!user.roleNames.includes(app_roles_1.AppRoles.ADMIN))
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        return this.accountsService.getTokenByDiscordId(args);
    }
    userRegisteredViaDiscord() {
        return this.pubSub.asyncIterator("userRegisteredViaDiscord");
    }
};
__decorate([
    graphql_1.Mutation(() => tokens_entity_1.Token),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_args_1.SignInArgs]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "signIn", null);
__decorate([
    graphql_1.Mutation(() => users_entity_1.User),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_args_1.SignUpArgs]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "signUp", null);
__decorate([
    graphql_1.Mutation(() => tokens_entity_1.Token),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_email_args_1.ConfirmEmailArgs]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "confirmEmail", null);
__decorate([
    graphql_1.Mutation(() => users_entity_1.User),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "requestEmailConfirmation", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_args_1.RequestPasswordResetArgs]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "requestPasswordReset", null);
__decorate([
    graphql_1.Mutation(() => tokens_entity_1.Token),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_args_1.ResetPasswordArgs]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "resetPassword", null);
__decorate([
    graphql_1.Mutation(() => users_entity_1.User),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_username_args_1.UpdateUsernameArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "updateUsername", null);
__decorate([
    graphql_1.Query(() => Boolean),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_username_free_args_1.IsUsernameFreeArgs]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "isUsernameFree", null);
__decorate([
    graphql_1.Query(() => tokens_entity_1.Token, { nullable: true }),
    common_1.UseGuards(auth_guard_1.GqlAuthGuard),
    __param(0, graphql_1.Args()), __param(1, auth_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_token_by_discord_id_args_1.GetTokenByDiscordIdArgs, users_entity_1.User]),
    __metadata("design:returntype", Promise)
], AccountsResolver.prototype, "getTokenByDiscordId", null);
__decorate([
    graphql_1.Subscription(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AccountsResolver.prototype, "userRegisteredViaDiscord", null);
AccountsResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter),
    graphql_1.Resolver('Accounts'),
    __param(0, common_1.Inject('PUB_SUB')),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub, accounts_service_1.AccountsService])
], AccountsResolver);
exports.AccountsResolver = AccountsResolver;
//# sourceMappingURL=accounts.resolver.js.map