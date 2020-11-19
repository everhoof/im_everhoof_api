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
let UsersService = class UsersService {
    constructor(pubSub, usersRepository) {
        this.pubSub = pubSub;
        this.usersRepository = usersRepository;
        this.onlineUsersIds = [];
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
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map