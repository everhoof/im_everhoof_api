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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMessagesArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let GetMessagesArgs = class GetMessagesArgs {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int, { defaultValue: 100 }),
    class_validator_1.IsInt(),
    class_validator_1.Max(200),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], GetMessagesArgs.prototype, "count", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { defaultValue: 1 }),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], GetMessagesArgs.prototype, "page", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], GetMessagesArgs.prototype, "lastId", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { defaultValue: false }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], GetMessagesArgs.prototype, "reverse", void 0);
GetMessagesArgs = __decorate([
    graphql_1.ArgsType()
], GetMessagesArgs);
exports.GetMessagesArgs = GetMessagesArgs;
//# sourceMappingURL=get-messages.args.js.map