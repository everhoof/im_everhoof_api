"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRepository = void 0;
const typeorm_1 = require("typeorm");
const exceptions_1 = require("../exceptions/exceptions");
const get_list_args_1 = require("../args/get-list.args");
class BasicRepository extends typeorm_1.Repository {
    async getList(args, options) {
        return this.find({
            skip: (args.page - 1) * args.count,
            take: args.count,
            ...(options !== null && options !== void 0 ? options : {}),
        });
    }
    async saveAndReturn(entity) {
        if (!entity)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        entity = await this.save(entity);
        entity = await this.findOne(entity.id);
        if (!entity)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        return entity;
    }
    async isExist(id) {
        if (!id)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        const entity = await this.findOne(id);
        if (!entity)
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        return entity;
    }
}
exports.BasicRepository = BasicRepository;
//# sourceMappingURL=basic.repository.js.map