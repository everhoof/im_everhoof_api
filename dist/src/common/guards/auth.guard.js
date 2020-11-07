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
exports.CurrentUser = exports.AuthGuard = exports.GqlAuthGuard = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
function canActivate(context) {
    const request = this.getRequest(context);
    return !(!request || !request.user);
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
        return canActivate.call(this, context, this.reflector);
    }
};
GqlAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
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
//# sourceMappingURL=auth.guard.js.map