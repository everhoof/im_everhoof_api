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
exports.PunishmentsLoader = void 0;
const common_1 = require("@nestjs/common");
const nestjs_graphql_dataloader_1 = require("@intelrug/nestjs-graphql-dataloader");
const typeorm_1 = require("@nestjs/typeorm");
const punishments_repository_1 = require("../repositories/punishments.repository");
const punishments_entity_1 = require("../entities/punishments.entity");
const typeorm_2 = require("typeorm");
let PunishmentsLoader = class PunishmentsLoader extends nestjs_graphql_dataloader_1.OrderedNestDataLoader {
    constructor(punishments) {
        super();
        this.punishments = punishments;
        this.getOptions = () => ({
            propertyKey: ['targetId', 'type'],
            query: async (keys) => {
                const punishments = await this.punishments.find({
                    where: keys.map((key) => ({ ...key, canceledAt: typeorm_2.IsNull() })),
                });
                return keys.map((key) => {
                    return (punishments.find((punishment) => punishment.targetId === key.targetId && punishment.type === key.type) ||
                        this.punishments.create({ targetId: key.targetId, type: key.type }));
                });
            },
        });
    }
};
PunishmentsLoader = __decorate([
    common_1.Injectable({ scope: common_1.Scope.REQUEST }),
    __param(0, typeorm_1.InjectRepository(punishments_repository_1.PunishmentsRepository)),
    __metadata("design:paramtypes", [punishments_repository_1.PunishmentsRepository])
], PunishmentsLoader);
exports.PunishmentsLoader = PunishmentsLoader;
//# sourceMappingURL=punishments.loader.js.map