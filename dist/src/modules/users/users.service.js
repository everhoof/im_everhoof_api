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
const unpunishment_args_1 = require("./args/unpunishment.args");
const exceptions_1 = require("../../common/exceptions/exceptions");
const tokens_repository_1 = require("../accounts/repositories/tokens.repository");
const get_user_by_id_args_1 = require("./args/get-user-by-id.args");
const messages_service_1 = require("../messages/messages.service");
const update_avatar_args_1 = require("./args/update-avatar.args");
const pictures_repository_1 = require("../pictures/repositories/pictures.repository");
const subscription_events_1 = require("../common/types/subscription-events");
let UsersService = class UsersService {
    constructor(pubSub, users, tokens, punishments, pictures, messagesService) {
        this.pubSub = pubSub;
        this.users = users;
        this.tokens = tokens;
        this.punishments = punishments;
        this.pictures = pictures;
        this.messagesService = messagesService;
        this.onlineUsersIds = [];
    }
    async getUserById(args) {
        const user = await this.users.findOne(args.id);
        if (!user)
            throw new exceptions_1.BadRequestException('USER_DOES_NOT_EXIST_WITH_ID', args.id.toString());
        return user;
    }
    async updateOnline() {
        const users = await this.users.find({
            where: {
                wasOnlineAt: typeorm_2.MoreThan(luxon_1.DateTime.utc().minus({ minutes: 2 }).toSQL()),
            },
        });
        const ids = users.map(({ id }) => id);
        const diff = utils_1.Utils.arrayDiff(this.onlineUsersIds, ids);
        if (diff.length > 0) {
            this.onlineUsersIds = ids;
            await this.pubSub.publish("onlineUpdated", users);
        }
    }
    async unpunishUsers() {
        const punishments = await this.punishments.find({
            where: {
                cancelAt: typeorm_2.LessThanOrEqual(luxon_1.DateTime.utc().toSQL()),
                canceledAt: typeorm_2.IsNull(),
            },
        });
        const jobs = punishments.map((punishment) => {
            this.unpunish({ userId: punishment.targetId });
        });
        await Promise.allSettled(jobs);
    }
    async getOnline() {
        return this.users.findByIds(this.onlineUsersIds);
    }
    async updateOnlineStatus() {
        await this.updateOnline();
    }
    async updateAvatar(args, executor) {
        const picture = await this.pictures.isExist(args.pictureId);
        if (picture.ownerId && picture.ownerId !== executor.id)
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        await this.users.update({
            id: executor.id,
        }, {
            avatarId: picture.id,
        });
        const user = await this.users.isExist(executor.id);
        const message = `${user.username} uploaded a new avatar`;
        await Promise.all([
            this.messagesService.createSystemMessage(message),
            this.pubSub.publish("userUpdated", user),
        ]);
        return user;
    }
    async punish(args, executor) {
        const user = await this.users.isExist(args.userId);
        let punishment = await this.punishments.getLastPunishment(args.userId);
        if (punishment)
            throw new exceptions_1.BadRequestException('USER_ALREADY_PUNISHED');
        const date = args.duration ? luxon_1.DateTime.local().plus({ minutes: args.duration }) : undefined;
        punishment = this.punishments.create({
            targetId: args.userId,
            executorId: executor.id,
            type: args.type,
            reason: args.reason,
            cancelAt: date?.toJSDate(),
        });
        const content = args.duration
            ? `${user.username} was ${args.type === punishment_args_1.PunishmentTypes.mute ? 'muted' : 'banned'} for ${args.duration} minutes with reason: ${args.reason}`
            : `${user.username} was ${args.type === punishment_args_1.PunishmentTypes.mute ? 'muted' : 'banned'} forever with reason: ${args.reason}`;
        await Promise.all([this.punishments.save(punishment), this.messagesService.createSystemMessage(content)]);
        await this.pubSub.publish("userUpdated", user);
        return user;
    }
    async unpunish(args, executor) {
        const user = await this.users.isExist(args.userId);
        const punishment = await this.punishments.getLastPunishment(args.userId);
        if (!punishment)
            throw new exceptions_1.BadRequestException('USER_IS_NOT_PUNISHED');
        punishment.canceledAt = new Date();
        if (executor)
            punishment.canceledById = executor.id;
        const content = `${user.username} was ${punishment.type === punishment_args_1.PunishmentTypes.mute ? 'unmuted' : 'unbanned'}`;
        await Promise.all([this.punishments.save(punishment), this.messagesService.createSystemMessage(content)]);
        await this.pubSub.publish("userUpdated", user);
        return user;
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_30_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "updateOnline", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "unpunishUsers", null);
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PUB_SUB')),
    __param(1, typeorm_1.InjectRepository(users_repository_1.UsersRepository)),
    __param(2, typeorm_1.InjectRepository(tokens_repository_1.TokensRepository)),
    __param(3, typeorm_1.InjectRepository(punishments_repository_1.PunishmentsRepository)),
    __param(4, typeorm_1.InjectRepository(pictures_repository_1.PicturesRepository)),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        users_repository_1.UsersRepository,
        tokens_repository_1.TokensRepository,
        punishments_repository_1.PunishmentsRepository,
        pictures_repository_1.PicturesRepository,
        messages_service_1.MessagesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map