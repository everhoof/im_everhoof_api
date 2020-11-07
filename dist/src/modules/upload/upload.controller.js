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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const upload_service_1 = require("./upload.service");
const users_entity_1 = require("../users/entities/users.entity");
const passport_1 = require("@nestjs/passport");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadImage(file, req) {
        return this.uploadService.uploadPicture(file, req.user);
    }
};
__decorate([
    common_1.Post('/image'),
    common_1.UseGuards(passport_1.AuthGuard('bearer')),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        dest: './upload',
        limits: {
            files: 1,
            fileSize: 10 * 1024 * 1024,
        },
        fileFilter(req, file, callback) {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                callback(new common_1.HttpException(`Unsupported file type ${path_1.extname(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
            }
            return callback(null, true);
        },
    })),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
UploadController = __decorate([
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    common_1.Controller('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map