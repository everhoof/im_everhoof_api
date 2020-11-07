"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ACGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACGuard = void 0;
const common_1 = require("@nestjs/common");
const nest_access_control_1 = require("nest-access-control");
const users_entity_1 = require("../../modules/users/entities/users.entity");
const graphql_1 = require("@nestjs/graphql");
let ACGuard = ACGuard_1 = class ACGuard extends nest_access_control_1.ACGuard {
    static getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    async getUser(context) {
        const request = ACGuard_1.getRequest(context);
        if (!request.user)
            throw new common_1.UnauthorizedException();
        return request.user;
    }
    async getUserRoles(context) {
        const user = await this.getUser(context);
        return user.roles.map((roles) => roles.name);
    }
};
ACGuard = ACGuard_1 = __decorate([
    common_1.Injectable()
], ACGuard);
exports.ACGuard = ACGuard;
//# sourceMappingURL=access-control.guard.js.map