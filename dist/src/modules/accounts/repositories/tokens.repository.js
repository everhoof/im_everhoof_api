"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensRepository = void 0;
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const tokens_entity_1 = require("../entities/tokens.entity");
let TokensRepository = class TokensRepository extends typeorm_1.Repository {
    async createNewToken(ownerId) {
        if (!ownerId)
            return Promise.resolve(undefined);
        const tokenString = await this.createTokenString();
        let tokenEntity = this.create({
            value: tokenString,
            ownerId: ownerId,
        });
        tokenEntity = await this.save(tokenEntity);
        tokenEntity = await this.findOne(tokenEntity.id);
        return tokenEntity;
    }
    getTokenByValue(value) {
        if (!value)
            return Promise.resolve(undefined);
        return this.findOne({ relations: ['owner', 'owner.roles'], where: { value } });
    }
    async createTokenString() {
        const buffer = crypto_1.randomBytes(48);
        const newToken = buffer.toString('base64');
        const accessToken = await this.findOne({ where: { value: newToken } });
        return accessToken ? this.createTokenString() : newToken;
    }
    async expireUserTokens(ownerId) {
        await this.delete({ ownerId });
    }
};
TokensRepository = __decorate([
    typeorm_1.EntityRepository(tokens_entity_1.Token)
], TokensRepository);
exports.TokensRepository = TokensRepository;
//# sourceMappingURL=tokens.repository.js.map