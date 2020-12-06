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
exports.WsAuthenticatedUser = exports.CurrentUser = exports.AuthGuard = exports.WsAuthGuard = exports.OptionalGqlAuthGuard = exports.GqlAuthGuard = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
const accounts_service_1 = require("../../modules/accounts/accounts.service");
function canActivate(context, optional = false) {
    const request = this.getRequest(context);
    if (!request || !request.user || request.user === -1) {
        if (optional) {
            if ((request === null || request === void 0 ? void 0 : request.user) === -1)
                throw new common_1.UnauthorizedException();
            return true;
        }
        throw new common_1.UnauthorizedException();
    }
    return true;
}
let GqlAuthGuard = class GqlAuthGuard extends passport_1.AuthGuard('bearer') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    async canActivate(context) {
        await super.canActivate(context);
        return canActivate.call(this, context);
    }
};
GqlAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
let OptionalGqlAuthGuard = class OptionalGqlAuthGuard extends passport_1.AuthGuard(['bearer-no-exception', 'anonymous']) {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    async canActivate(context) {
        await super.canActivate(context);
        return canActivate.call(this, context, true);
    }
};
OptionalGqlAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], OptionalGqlAuthGuard);
exports.OptionalGqlAuthGuard = OptionalGqlAuthGuard;
let WsAuthGuard = class WsAuthGuard {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    async canActivate(context) {
        var _a;
        const client = context.switchToWs().getClient();
        const cookies = client.handshake.headers.cookie.split('; ');
        const token = (_a = cookies.find((cookie) => cookie.startsWith('token'))) === null || _a === void 0 ? void 0 : _a.split('=')[1];
        if (!token)
            return false;
        const tokenEntity = await this.accountsService.validateUserByToken(decodeURIComponent(token));
        if (!tokenEntity)
            return false;
        context.switchToWs().getData().user = tokenEntity.owner;
        return true;
    }
};
WsAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], WsAuthGuard);
exports.WsAuthGuard = WsAuthGuard;
let AuthGuard = class AuthGuard extends passport_1.AuthGuard('bearer') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    async canActivate(context) {
        await super.canActivate(context);
        return canActivate.call(this, context, this.reflector);
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
exports.CurrentUser = common_1.createParamDecorator((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
exports.WsAuthenticatedUser = common_1.createParamDecorator((data, context) => {
    return context.switchToWs().getData().user;
});
//# sourceMappingURL=auth.guard.js.map