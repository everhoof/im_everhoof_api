"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("./repositories/users.repository");
const users_service_1 = require("./users.service");
const users_resolver_1 = require("./users.resolver");
const users_loader_1 = require("./loaders/users.loader");
const punishments_repository_1 = require("./repositories/punishments.repository");
const tokens_repository_1 = require("../accounts/repositories/tokens.repository");
const messages_module_1 = require("../messages/messages.module");
const pictures_repository_1 = require("../pictures/repositories/pictures.repository");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([users_repository_1.UsersRepository, tokens_repository_1.TokensRepository, punishments_repository_1.PunishmentsRepository, pictures_repository_1.PicturesRepository]),
            messages_module_1.MessagesModule,
        ],
        providers: [users_service_1.UsersService, users_resolver_1.UsersResolver, users_loader_1.UsersLoader],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map