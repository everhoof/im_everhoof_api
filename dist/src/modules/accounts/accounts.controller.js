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
exports.OAuthController = void 0;
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const passport_1 = require("@nestjs/passport");
let OAuthController = class OAuthController {
    oauthDiscord(req, res) {
        return res.redirect(process.env.PUBLIC_URL || '');
    }
};
__decorate([
    common_1.Get('discord'),
    common_1.UseGuards(passport_1.AuthGuard('discord')),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "oauthDiscord", null);
OAuthController = __decorate([
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    common_1.Controller('oauth')
], OAuthController);
exports.OAuthController = OAuthController;
//# sourceMappingURL=accounts.controller.js.map