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
exports.CreateMessageArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateMessageArgs = class CreateMessageArgs {
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(2000),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateMessageArgs.prototype, "content", void 0);
__decorate([
    graphql_1.Field(() => [graphql_1.Int], { defaultValue: [] }),
    class_validator_1.IsArray(),
    class_validator_1.IsInt({ each: true }),
    class_validator_1.ArrayMaxSize(32),
    __metadata("design:type", Array)
], CreateMessageArgs.prototype, "pictures", void 0);
CreateMessageArgs = __decorate([
    graphql_1.ArgsType()
], CreateMessageArgs);
exports.CreateMessageArgs = CreateMessageArgs;
//# sourceMappingURL=create-message.args.js.map