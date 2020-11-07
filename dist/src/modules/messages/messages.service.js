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
let MessagesService = class MessagesService {
    constructor(messagesRepository, picturesRepository) {
        this.messagesRepository = messagesRepository;
        this.picturesRepository = picturesRepository;
    }
    async createMessage(args, user) {
        if (!args.content.trim() && args.pictures.length === 0)
            throw new exceptions_1.BadRequestException('CANNOT_CREATE_EMPTY_MESSAGE');
        const message = this.messagesRepository.create({
            content: args.content.trim(),
            ownerId: user.id,
            username: user.username,
        });
        message.pictures = args.pictures.map((id) => this.picturesRepository.create({ id }));
        return this.messagesRepository.save(message);
    }
    async getMessages(args) {
        return this.messagesRepository.getList(args);
    }
};
MessagesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(messages_repository_1.MessagesRepository)),
    __param(1, typeorm_1.InjectRepository(pictures_repository_1.PicturesRepository)),
    __metadata("design:paramtypes", [messages_repository_1.MessagesRepository,
        pictures_repository_1.PicturesRepository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map