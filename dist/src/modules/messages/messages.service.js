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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MessagesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_repository_1 = require("./repositories/messages.repository");
const create_message_args_1 = require("./args/create-message.args");
const messages_entity_1 = require("./entities/messages.entity");
const users_entity_1 = require("../users/entities/users.entity");
const pictures_repository_1 = require("../pictures/repositories/pictures.repository");
const get_messages_args_1 = require("./args/get-messages.args");
const exceptions_1 = require("../../common/exceptions/exceptions");
const got_1 = __importDefault(require("got"));
const utils_1 = require("../../common/utils/utils");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const path_1 = require("path");
const upload_service_1 = require("../upload/upload.service");
const xss_1 = require("xss");
const delete_message_args_1 = require("./args/delete-message.args");
const typeorm_2 = require("typeorm");
const app_roles_1 = require("../../app.roles");
const punishments_repository_1 = require("../users/repositories/punishments.repository");
const punishment_args_1 = require("../users/args/punishment.args");
let MessagesService = MessagesService_1 = class MessagesService {
    constructor(pubSub, messagesRepository, picturesRepository, punishmentsRepository, uploadService) {
        this.pubSub = pubSub;
        this.messagesRepository = messagesRepository;
        this.picturesRepository = picturesRepository;
        this.punishmentsRepository = punishmentsRepository;
        this.uploadService = uploadService;
    }
    async throwOnPunished(targetId) {
        const punishment = await this.punishmentsRepository.getLastPunishment(targetId);
        if (!punishment)
            return;
        if (punishment.type === punishment_args_1.PunishmentTypes.mute)
            throw new exceptions_1.BadRequestException('YOU_ARE_MUTED');
        if (punishment.type === punishment_args_1.PunishmentTypes.ban)
            throw new exceptions_1.BadRequestException('YOU_ARE_BANNED');
    }
    async createMessage(args, user) {
        if (!args.content?.trim() && args.pictures.length === 0)
            throw new exceptions_1.BadRequestException('CANNOT_CREATE_EMPTY_MESSAGE');
        await this.throwOnPunished(user.id);
        let message = this.messagesRepository.create({
            content: utils_1.Utils.escapeMessage(args.content?.trim() || ''),
            ownerId: user.id,
            username: user.username?.trim(),
            randomId: args.randomId?.trim(),
        });
        message.pictures = args.pictures.map((id) => this.picturesRepository.create({ id }));
        try {
            message = await this.uploadImagesFromMessage(message, user);
        }
        catch (e) { }
        return this.messagesRepository.save(message);
    }
    async createSystemMessage(content) {
        if (!content.trim())
            throw new exceptions_1.InternalServerErrorException('CANNOT_CREATE_EMPTY_MESSAGE');
        let message = this.messagesRepository.create({
            content: xss_1.escapeHtml(content.trim()),
            system: true,
        });
        message = await this.messagesRepository.saveAndReturn(message);
        await this.pubSub.publish('messageCreated', { messageCreated: message });
        return message;
    }
    async uploadImagesFromMessage(message, user) {
        if (!message.content)
            return message;
        if (/^\\(https?:\/\/.*?\.(?:png|jpg))$/i.test(message.content)) {
            message.content = message.content.slice(1);
            return message;
        }
        if (!/^(https?:\/\/.*?\.(?:png|jpg))$/i.test(message.content))
            return message;
        const request = got_1.default(message.content);
        request.on('downloadProgress', (progress) => {
            if ((progress.total && progress.total > MessagesService_1.EMBED_UPLOAD_IMAGE_MAX_SIZE) ||
                progress.transferred > MessagesService_1.EMBED_UPLOAD_IMAGE_MAX_SIZE) {
                request.cancel();
            }
        });
        const buffer = await request.buffer();
        const filename = utils_1.Utils.getRandomString(32);
        const file = {
            buffer,
            originalname: path_1.basename(message.content),
            filename,
        };
        const picture = await this.uploadService.uploadPicture(file, user, message.content);
        message.pictures = [picture];
        message.content = '';
        return message;
    }
    async getMessages(args, user) {
        let where = {};
        const order = { id: 'DESC' };
        if (args.lastId && args.reverse) {
            where = { id: typeorm_2.LessThan(args.lastId) };
        }
        else if (args.lastId) {
            where = { id: typeorm_2.MoreThan(args.lastId) };
        }
        const canReadAny = (user && app_roles_1.roles.can(user?.roleNames).readAny(app_roles_1.RoleResources.DELETED_MESSAGE).granted) || false;
        if (canReadAny) {
            return this.messagesRepository.getList(args, {
                where: where,
                order: order,
            });
        }
        return this.messagesRepository.getList(args, {
            where: { ...where, deletedAt: typeorm_2.IsNull() },
            order: order,
        });
    }
    async deleteMessage(args, user) {
        const canDeleteAny = app_roles_1.roles.can(user.roleNames).deleteAny('message').granted;
        const canDeleteOwn = app_roles_1.roles.can(user.roleNames).deleteOwn('message').granted;
        if (!args.messageId || (!canDeleteOwn && !canDeleteAny))
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        const message = await this.messagesRepository.findOne(args.messageId);
        if (!message)
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        if (!canDeleteAny && canDeleteOwn && message.ownerId !== user.id)
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        message.deletedById = user?.id ?? undefined;
        message.deletedAt = new Date();
        return this.messagesRepository.saveAndReturn(message);
    }
};
MessagesService.EMBED_UPLOAD_IMAGE_MAX_SIZE = parseInt(process.env.EMBED_UPLOAD_IMAGE_MAX_SIZE || '52428800') || 52428800;
MessagesService = MessagesService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PUB_SUB')),
    __param(1, typeorm_1.InjectRepository(messages_repository_1.MessagesRepository)),
    __param(2, typeorm_1.InjectRepository(pictures_repository_1.PicturesRepository)),
    __param(3, typeorm_1.InjectRepository(punishments_repository_1.PunishmentsRepository)),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        messages_repository_1.MessagesRepository,
        pictures_repository_1.PicturesRepository,
        punishments_repository_1.PunishmentsRepository,
        upload_service_1.UploadService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map