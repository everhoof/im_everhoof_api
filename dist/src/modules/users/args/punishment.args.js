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
exports.PunishmentArgs = exports.PunishmentTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var PunishmentTypes;
(function (PunishmentTypes) {
    PunishmentTypes["ban"] = "ban";
    PunishmentTypes["mute"] = "mute";
})(PunishmentTypes = exports.PunishmentTypes || (exports.PunishmentTypes = {}));
graphql_1.registerEnumType(PunishmentTypes, { name: 'PunishmentTypes' });
let PunishmentArgs = class PunishmentArgs {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], PunishmentArgs.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => Date),
    class_validator_1.IsEnum(PunishmentTypes),
    __metadata("design:type", String)
], PunishmentArgs.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => String),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(200),
    __metadata("design:type", String)
], PunishmentArgs.prototype, "reason", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    class_validator_1.IsISO8601(),
    __metadata("design:type", String)
], PunishmentArgs.prototype, "cancelAt", void 0);
PunishmentArgs = __decorate([
    graphql_1.ArgsType()
], PunishmentArgs);
exports.PunishmentArgs = PunishmentArgs;
//# sourceMappingURL=punishment.args.js.map