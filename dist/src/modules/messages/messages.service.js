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
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../../common/utils/utils");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const path_1 = require("path");
const upload_service_1 = require("../upload/upload.service");
let MessagesService = class MessagesService {
    constructor(pubSub, messagesRepository, picturesRepository, uploadService) {
        this.pubSub = pubSub;
        this.messagesRepository = messagesRepository;
        this.picturesRepository = picturesRepository;
        this.uploadService = uploadService;
    }
    async createMessage(args, user) {
        var _a, _b, _c;
        if (!((_a = args.content) === null || _a === void 0 ? void 0 : _a.trim()) && args.pictures.length === 0)
            throw new exceptions_1.BadRequestException('CANNOT_CREATE_EMPTY_MESSAGE');
        let message = this.messagesRepository.create({
            content: (_b = args.content) === null || _b === void 0 ? void 0 : _b.trim(),
            ownerId: user.id,
            username: user.username.trim(),
            randomId: (_c = args.randomId) === null || _c === void 0 ? void 0 : _c.trim(),
        });
        message.pictures = args.pictures.map((id) => this.picturesRepository.create({ id }));
        message = await this.uploadImagesFromMessage(message, user);
        return this.messagesRepository.save(message);
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
        const buffer = await got_1.default(message.content).buffer();
        const filename = utils_1.Utils.getRandomString(32);
        const path = './uploads/' + filename;
        await fs_extra_1.writeFile(path, buffer);
        const file = {
            path,
            buffer,
            originalname: path_1.basename(message.content),
            filename,
        };
        const picture = await this.uploadService.uploadPicture(file, user);
        message.pictures = [picture];
        return message;
    }
    async getMessages(args) {
        return this.messagesRepository.getList(args);
    }
};
MessagesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PUB_SUB')),
    __param(1, typeorm_1.InjectRepository(messages_repository_1.MessagesRepository)),
    __param(2, typeorm_1.InjectRepository(pictures_repository_1.PicturesRepository)),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub,
        messages_repository_1.MessagesRepository,
        pictures_repository_1.PicturesRepository,
        upload_service_1.UploadService])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map