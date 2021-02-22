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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("./repositories/users.repository");
const schedule_1 = require("@nestjs/schedule");
const typeorm_2 = require("typeorm");
const luxon_1 = require("luxon");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const users_entity_1 = require("./entities/users.entity");
const utils_1 = require("../../common/utils/utils");
const punishment_args_1 = require("./args/punishment.args");
const punishments_repository_1 = require("./repositories/punishments.repository");
const punishments_entity_1 = require("./entities/punishments.entity");
const unpunishment_args_1 = require("./args/unpunishment.args");
const exceptions_1 = require("../../common/exceptions/exceptions");
const tokens_repository_1 = require("../accounts/repositories/tokens.repository");
const get_user_by_id_args_1 = require("./args/get-user-by-id.args");
let UsersService = class UsersService {
    constructor(pubSub, usersRepository, tokensRepository, punishmentsRepository) {
        this.pubSub = pubSub;
        this.usersRepository = usersRepository;
        this.tokensRepository = tokensRepository;
        this.punishmentsRepository = punishmentsRepository;
        this.onlineUsersIds = [];
    }
    async getUserById(args) {
        const user = await this.usersRepository.findOne(args.id);
        if (!user)
            throw new exceptions_1.BadRequestException('USER_DOES_NOT_EXIST_WITH_ID', args.id.toString());
        return user;
    }
    async updateOnline() {
        const users = await this.usersRepository.find({
            where: {
                wasOnlineAt: typeorm_2.MoreThan(luxon_1.DateTime.utc().minus({ minutes: 2 }).toSQL()),
            },
        });
        const ids = users.map(({ id }) => id);
        const diff = utils_1.Utils.arrayDiff(this.onlineUsersIds, ids);
        if (diff.length > 0) {
            this.onlineUsersIds = ids;
            await this.pubSub.publish('onlineUpdated', { onlineUpdated: users });
        }
    }
    async getOnline() {
        return this.usersRepository.findByIds(this.onlineUsersIds);
    }
    async updateOnlineStatus() {
        await this.updateOnline();
    }
    async punish(args, executor) {
        await this.usersRepository.isExist(args.userId);
        let punishment = await this.punishmentsRepository.getLastPunishment(args.userId);
        if (punishment)
            throw new exceptions_1.BadRequestException('USER_ALREADY_PUNISHED');
        punishment = this.punishmentsRepository.create({
            targetId: args.userId,
            executorId: executor.id,
            type: args.type,
            reason: args.reason,
            cancelAt: args.cancelAt ? luxon_1.DateTime.fromISO(args.cancelAt).toJSDate() : undefined,
        });
        return this.punishmentsRepository.saveAndReturn(punishment);
    }
    async unpunish(args, executor) {
        await this.usersRepository.isExist(args.userId);
        const punishment = await this.punishmentsRepository.getLastPunishment(args.userId);
        if (!punishment)
            throw new exceptions_1.BadRequestException('USER_IS_NOT_PUNISHED');
        punishment.canceledAt = new Date();
        punishment.canceledById = executor.id;
        await this.tokensRepository.expireUserTokens(args.userId);
        return this.punishmentsRepository.saveAndReturn(punishment);
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_30_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "updateOnline", null);
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PUB_SUB')),
    __param(1, typeorm_1.InjectRepository(users_repository_1.UsersRepository)),
    __param(2, typeorm_1.InjectRepository(tokens_repository_1.TokensRepository)),
    __param(3, typeorm_1.InjectRepository(punishments_repository_1.PunishmentsRepository)),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        users_repository_1.UsersRepository,
        tokens_repository_1.TokensRepository,
        punishments_repository_1.PunishmentsRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map