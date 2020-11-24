"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
const basic_repository_1 = require("../../../common/repositories/basic.repository");
const sign_up_args_1 = require("../../accounts/args/sign-up.args");
const exceptions_1 = require("../../../common/exceptions/exceptions");
let UsersRepository = class UsersRepository extends basic_repository_1.BasicRepository {
    getUserByEmailOrUsername(email) {
        if (!email)
            return Promise.resolve(undefined);
        return this.findOne({
            select: ['id', 'username', 'email', 'salt', 'hash'],
            where: [{ username: typeorm_1.ILike(email.toLowerCase()) }, { email: typeorm_1.ILike(email.toLowerCase()) }],
        });
    }
    getUserByEmailAndUsername(email, username) {
        if (!email)
            return Promise.resolve(undefined);
        return this.findOne({
            where: [
                { username: username ? typeorm_1.ILike(username) : undefined },
                { email: email },
                { username: email },
                { email: username ? typeorm_1.ILike(username) : undefined },
            ],
        });
    }
    async createNewUser(input) {
        const user = this.create({
            email: input.email,
            username: input.username || undefined,
            salt: input.salt,
            hash: input.hash,
        });
        return this.saveAndReturn(user);
    }
    async userExists(userId) {
        const user = await this.findOne(userId);
        if (user)
            return user;
        else
            throw new exceptions_1.BadRequestException('USER_DOES_NOT_EXIST_WITH_ID', userId.toString());
    }
};
UsersRepository = __decorate([
    typeorm_1.EntityRepository(users_entity_1.User)
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map