"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PunishmentsRepository = void 0;
const typeorm_1 = require("typeorm");
const basic_repository_1 = require("../../../common/repositories/basic.repository");
const punishments_entity_1 = require("../entities/punishments.entity");
let PunishmentsRepository = class PunishmentsRepository extends basic_repository_1.BasicRepository {
    getLastPunishment(userId) {
        return this.findOne({
            where: {
                targetId: userId,
                canceledAt: typeorm_1.IsNull(),
            },
        });
    }
};
PunishmentsRepository = __decorate([
    typeorm_1.EntityRepository(punishments_entity_1.Punishment)
], PunishmentsRepository);
exports.PunishmentsRepository = PunishmentsRepository;
//# sourceMappingURL=punishments.repository.js.map