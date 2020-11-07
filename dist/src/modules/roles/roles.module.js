"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_repository_1 = require("./repositories/roles.repository");
const roles_service_1 = require("./roles.service");
const roles_resolver_1 = require("./roles.resolver");
let RolesModule = class RolesModule {
};
RolesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([roles_repository_1.RolesRepository])],
        providers: [roles_service_1.RolesService, roles_resolver_1.RolesResolver],
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map