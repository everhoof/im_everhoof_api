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
let AccountsResolver = class AccountsResolver {
    constructor(accountsService) {
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
    async requestEmailConfirmation(args) {
        return this.accountsService.requestEmailConfirmation(args);
    }
    async requestPasswordReset(args) {
        return this.accountsService.requestPasswordReset(args);
    }
    async resetPassword(args) {
        return this.accountsService.resetPassword(args);
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
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_args_1.SignInArgs]),
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
AccountsResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter),
    graphql_1.Resolver('Accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsResolver);
exports.AccountsResolver = AccountsResolver;
//# sourceMappingURL=accounts.resolver.js.map