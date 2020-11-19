"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_repository_1 = require("./repositories/messages.repository");
const messages_service_1 = require("./messages.service");
const messages_resolver_1 = require("./messages.resolver");
const pictures_repository_1 = require("../pictures/repositories/pictures.repository");
const accounts_module_1 = require("../accounts/accounts.module");
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([messages_repository_1.MessagesRepository, pictures_repository_1.PicturesRepository]), accounts_module_1.AccountsModule],
        providers: [messages_service_1.MessagesService, messages_resolver_1.MessagesResolver],
    })
], MessagesModule);
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map