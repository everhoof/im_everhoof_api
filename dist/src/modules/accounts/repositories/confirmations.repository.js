"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationsRepository = void 0;
const typeorm_1 = require("typeorm");
const confirmations_entity_1 = require("../entities/confirmations.entity");
const confirmation_type_enum_1 = require("../types/confirmation-type.enum");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../common/utils/utils");
const basic_repository_1 = require("../../../common/repositories/basic.repository");
let ConfirmationsRepository = class ConfirmationsRepository extends basic_repository_1.BasicRepository {
    async createNewConfirmation(userId, type, sendCount = 0) {
        if (!userId)
            throw new common_1.InternalServerErrorException('UNKNOWN');
        let confirmationEntity = await this.findOne({ where: { userId, type } });
        if (confirmationEntity) {
            confirmationEntity.createdAt = new Date();
        }
        else {
            const confirmationString = await this.createConfirmationString();
            confirmationEntity = this.create({
                value: confirmationString,
                userId,
                type,
                sendCount,
            });
        }
        return this.saveAndReturn(confirmationEntity);
    }
    getConfirmationByValue(value) {
        if (!value)
            return Promise.resolve(undefined);
        return this.findOne({ where: { value } });
    }
    async createConfirmationString() {
        const newValue = utils_1.Utils.getRandomString();
        const value = await this.findOne({ where: { value: newValue } });
        return value ? this.createConfirmationString() : newValue;
    }
    findOnePasswordResetByUserId(userId) {
        return this.findOne({ where: { userId, type: confirmation_type_enum_1.ConfirmationType.password } });
    }
};
ConfirmationsRepository = __decorate([
    typeorm_1.EntityRepository(confirmations_entity_1.Confirmation)
], ConfirmationsRepository);
exports.ConfirmationsRepository = ConfirmationsRepository;
//# sourceMappingURL=confirmations.repository.js.map