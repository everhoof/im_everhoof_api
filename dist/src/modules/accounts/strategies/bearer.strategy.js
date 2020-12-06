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
exports.BearerStrategyNoException = exports.BearerStrategy = void 0;
const passport_http_bearer_1 = require("passport-http-bearer");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../accounts.service");
const users_entity_1 = require("../../users/entities/users.entity");
let BearerStrategy = class BearerStrategy extends passport_1.PassportStrategy(passport_http_bearer_1.Strategy) {
    constructor(accountsService) {
        super();
        this.accountsService = accountsService;
    }
    async validate(token) {
        const tokenEntity = await this.accountsService.validateUserByToken(token);
        if (!tokenEntity) {
            throw new common_1.UnauthorizedException();
        }
        return tokenEntity.owner;
    }
};
BearerStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], BearerStrategy);
exports.BearerStrategy = BearerStrategy;
let BearerStrategyNoException = class BearerStrategyNoException extends passport_1.PassportStrategy(passport_http_bearer_1.Strategy, 'bearer-no-exception') {
    constructor(accountsService) {
        super();
        this.accountsService = accountsService;
    }
    async validate(token) {
        try {
            const tokenEntity = await this.accountsService.validateUserByToken(token);
            return (tokenEntity === null || tokenEntity === void 0 ? void 0 : tokenEntity.owner) || -1;
        }
        catch (e) {
            return -1;
        }
    }
};
BearerStrategyNoException = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], BearerStrategyNoException);
exports.BearerStrategyNoException = BearerStrategyNoException;
//# sourceMappingURL=bearer.strategy.js.map