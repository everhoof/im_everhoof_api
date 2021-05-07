"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const users_module_1 = require("../users/users.module");
const tokens_repository_1 = require("./repositories/tokens.repository");
const users_repository_1 = require("../users/repositories/users.repository");
const bearer_strategy_1 = require("./strategies/bearer.strategy");
const accounts_resolver_1 = require("./accounts.resolver");
const accounts_service_1 = require("./accounts.service");
const roles_repository_1 = require("../roles/repositories/roles.repository");
const anonymous_strategy_1 = require("./strategies/anonymous.strategy");
const confirmations_repository_1 = require("./repositories/confirmations.repository");
const oauth_repository_1 = require("./repositories/oauth.repository");
const discord_strategy_1 = require("./strategies/discord.strategy");
const accounts_controller_1 = require("./accounts.controller");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => users_module_1.UsersModule),
            passport_1.PassportModule,
            typeorm_1.TypeOrmModule.forFeature([
                tokens_repository_1.TokensRepository,
                users_repository_1.UsersRepository,
                roles_repository_1.RolesRepository,
                confirmations_repository_1.ConfirmationsRepository,
                oauth_repository_1.OAuthRepository,
            ]),
        ],
        providers: [
            accounts_service_1.AccountsService,
            accounts_resolver_1.AccountsResolver,
            bearer_strategy_1.BearerStrategy,
            bearer_strategy_1.BearerStrategyNoException,
            anonymous_strategy_1.AnonymousStrategy,
            discord_strategy_1.DiscordStrategy,
        ],
        controllers: [accounts_controller_1.OAuthController],
        exports: [accounts_service_1.AccountsService, typeorm_1.TypeOrmModule.forFeature([tokens_repository_1.TokensRepository])],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map