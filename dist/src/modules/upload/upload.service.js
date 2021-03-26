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
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const gm_1 = __importDefault(require("gm"));
const got_1 = __importDefault(require("got"));
const form_data_1 = __importDefault(require("form-data"));
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const pictures_repository_1 = require("../pictures/repositories/pictures.repository");
const picture_representations_repository_1 = require("../pictures/repositories/picture-representations.repository");
const pictures_entity_1 = require("../pictures/entities/pictures.entity");
const users_entity_1 = require("../users/entities/users.entity");
const exceptions_1 = require("../../common/exceptions/exceptions");
const compressed_picture_1 = require("./types/compressed-picture");
const DiscordMessage_1 = require("./types/DiscordMessage");
const uploaded_picture_1 = require("./types/uploaded-picture");
const utils_1 = require("../../common/utils/utils");
const file_type_1 = require("file-type");
const image_size_1 = require("image-size");
let UploadService = UploadService_1 = class UploadService {
    constructor(picturesRepository, pictureRepresentationsRepository) {
        this.picturesRepository = picturesRepository;
        this.pictureRepresentationsRepository = pictureRepresentationsRepository;
        this.logger = new common_1.Logger(UploadService_1.name, true);
        this.httpClient = got_1.default.extend({
            prefixUrl: `https://discord.com/api/v${process.env.DISCORD_API_VERSION}/`,
            headers: {
                Authorization: `Bot ${process.env.DISCORD_API_TOKEN}`,
            },
        });
    }
    async uploadPicture(file, user, source) {
        if (UploadService_1.queue.length > 16) {
            throw new exceptions_1.ServiceUnavailableException('SERVER_IS_OVERLOADED');
        }
        if (!file)
            throw new exceptions_1.BadRequestException('NO_FILE_PROVIDED');
        const path = utils_1.Utils.getRandomString(24);
        const fileType = await file_type_1.fromBuffer(file.buffer);
        if (!fileType?.ext.match(/(jpg|jpeg|png)/)) {
            throw new exceptions_1.UnsupportedMediaTypeException('UNSUPPORTED_MEDIA_TYPE');
        }
        const gmInstance = gm_1.default(file.buffer);
        const dimensions = await this.gmToDimensions(gmInstance);
        if (dimensions.height < 10 || dimensions.width < 10) {
            throw new exceptions_1.BadRequestException('IMAGE_CORRUPTED');
        }
        if (dimensions.height > 11000 || dimensions.width > 11000) {
            throw new exceptions_1.BadRequestException('IMAGE_DIMENSIONS_TOO_LARGE');
        }
        const id = file.originalname + '_' + Date.now() + '_' + user.id;
        UploadService_1.queue.push(id);
        await utils_1.Utils.conditionalWait(() => !!UploadService_1.queue.length && UploadService_1.queue[0] === id);
        try {
            let attachment;
            if (!source) {
                const message = await this.uploadFileToDiscord(file);
                attachment = message.attachments[0];
            }
            const { s, m } = await this.compressImage(gmInstance);
            const filename = path_1.basename(file.originalname, path_1.extname(file.originalname))
                .replace(/[^a-z0-9_\-+]/, '_')
                .substr(0, 100);
            const [sPath, mPath] = [
                this.generateObjectPath({
                    path: path + '/s',
                    name: filename,
                    ext: 'jpeg',
                }),
                this.generateObjectPath({
                    path: path + '/m',
                    name: filename,
                    ext: 'jpeg',
                }),
            ];
            await Promise.all([
                fs_extra_1.createFile(process.env.UPLOAD_DIR + sPath),
                fs_extra_1.createFile(process.env.UPLOAD_DIR + mPath),
            ]);
            await Promise.all([
                fs_extra_1.writeFile(process.env.UPLOAD_DIR + sPath, s.buffer),
                fs_extra_1.writeFile(process.env.UPLOAD_DIR + mPath, m.buffer),
            ]);
            let o;
            if (source) {
                o = {
                    key: source,
                    dimensions: image_size_1.imageSize(file.buffer),
                    size: this.bufferToFileSize(file.buffer),
                };
            }
            else {
                o = {
                    key: attachment.proxy_url,
                    dimensions: {
                        height: attachment.height,
                        width: attachment.width,
                    },
                    size: attachment.size,
                };
            }
            const picture = await this.savePicture(user.id, {
                s: { key: sPath, dimensions: image_size_1.imageSize(s.buffer), size: s.size },
                m: { key: mPath, dimensions: image_size_1.imageSize(m.buffer), size: m.size },
                o: o,
            });
            UploadService_1.queue.shift();
            return picture;
        }
        catch (e) {
            this.logger.debug(e);
            UploadService_1.queue.shift();
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        }
    }
    generateObjectPath(options) {
        if (!options.path)
            options.path = utils_1.Utils.getRandomString(64);
        if (!options.name)
            options.name = utils_1.Utils.getRandomString(8);
        if (!options.ext)
            options.ext = 'jpeg';
        else
            options.ext = options.ext.replace(/^\./, '');
        return `${utils_1.Utils.getDate()}/${options.path}/${options.name}.${options.ext}`.replace(/\/\//g, '');
    }
    async savePicture(ownerId, representations) {
        const types = ['s', 'm', 'o'];
        const representationEntities = types.map((type) => this.pictureRepresentationsRepository.create({
            height: representations[type].dimensions.height,
            width: representations[type].dimensions.width,
            size: representations[type].size,
            path: representations[type].key,
        }));
        const [s, m, o] = await this.pictureRepresentationsRepository.save(representationEntities);
        const picture = this.picturesRepository.create({
            ownerId,
            sId: s.id,
            mId: m.id,
            oId: o.id,
        });
        return this.picturesRepository.saveAndReturn(picture);
    }
    async uploadFileToDiscord(file) {
        try {
            const form = new form_data_1.default();
            form.append('file', file.buffer, file.originalname);
            const message = await this.httpClient
                .post(`channels/${process.env.DISCORD_UPLOAD_CHANNEL_ID}/messages`, {
                body: form,
            })
                .json();
            if (!message.attachments[0])
                throw new exceptions_1.InternalServerErrorException('UNKNOWN');
            return message;
        }
        catch (e) {
            this.logger.debug(e);
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        }
    }
    scale(dimensions, ratio, limit) {
        let height = dimensions.height;
        let width = dimensions.width;
        height *= Math.abs(ratio);
        width *= Math.abs(ratio);
        if (ratio < 1) {
            if (limit) {
                if (dimensions.width > limit && dimensions.height > limit) {
                    if (dimensions.width < dimensions.height) {
                        width = limit;
                        height = Math.floor(limit * (dimensions.height / dimensions.width));
                    }
                    else if (dimensions.height < dimensions.width) {
                        height = limit;
                        width = Math.floor(limit * (dimensions.width / dimensions.height));
                    }
                    else {
                        height = limit;
                        width = limit;
                    }
                }
                else {
                    return { height: dimensions.height, width: dimensions.width };
                }
            }
        }
        return { height, width };
    }
    async compressImage(gmInstance) {
        const m = gmInstance
            .noProfile()
            .setFormat('jpeg')
            .resize(512, 512)
            .quality(90)
            .limit('memory', '900M')
            .limit('threads', '1');
        const mBuffer = await this.gmToBuffer(m);
        const s = gm_1.default(mBuffer).noProfile().setFormat('jpeg').resize(128, 128).quality(98);
        const sBuffer = await this.gmToBuffer(s);
        const [sSize, mSize] = [this.bufferToFileSize(sBuffer), this.bufferToFileSize(mBuffer)];
        return {
            s: { buffer: sBuffer, size: sSize },
            m: { buffer: mBuffer, size: mSize },
        };
    }
    gmToBuffer(data) {
        return new Promise((resolve, reject) => {
            data.stream((err, stdout, stderr) => {
                if (err)
                    return reject(err);
                const chunks = [];
                stdout.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                stdout.once('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                stderr.once('data', (data) => {
                    if (!/known incorrect .* profile/.test(String(data)))
                        reject(String(data));
                });
            });
        });
    }
    gmToDimensions(data) {
        return new Promise((resolve, reject) => {
            data.size((err, dimensions) => {
                if (err)
                    return reject(err);
                resolve(dimensions);
            });
        });
    }
    bufferToFileSize(buffer) {
        return buffer.byteLength;
    }
};
UploadService.queue = [];
UploadService = UploadService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(pictures_repository_1.PicturesRepository)),
    __param(1, typeorm_1.InjectRepository(picture_representations_repository_1.PictureRepresentationsRepository)),
    __metadata("design:paramtypes", [pictures_repository_1.PicturesRepository,
        picture_representations_repository_1.PictureRepresentationsRepository])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map