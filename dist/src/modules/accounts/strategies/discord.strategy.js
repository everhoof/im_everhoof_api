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
exports.DiscordStrategy = void 0;
const passport_discord_1 = require("passport-discord");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../accounts.service");
const tokens_entity_1 = require("../entities/tokens.entity");
let DiscordStrategy = class DiscordStrategy extends passport_1.PassportStrategy(passport_discord_1.Strategy, 'discord') {
    constructor(accountsService) {
        super({
            clientID: process.env.DISCORD_OAUTH_CLIENT_ID,
            clientSecret: process.env.DISCORD_OAUTH_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_OAUTH_CALLBACK_URL,
            scope: ['identify', 'email'],
        });
        this.accountsService = accountsService;
    }
    async validate(accessToken, refreshToken, profile) {
        return this.accountsService.validateUserByDiscord(accessToken, refreshToken, profile);
    }
};
DiscordStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], DiscordStrategy);
exports.DiscordStrategy = DiscordStrategy;
//# sourceMappingURL=discord.strategy.js.map