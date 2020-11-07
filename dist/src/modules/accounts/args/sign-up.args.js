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
exports.SignUpArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let SignUpArgs = class SignUpArgs {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], SignUpArgs.prototype, "email", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.Matches(/^[a-zA-Z0-9\-_]+$/),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(32),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SignUpArgs.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(255),
    __metadata("design:type", String)
], SignUpArgs.prototype, "password", void 0);
SignUpArgs = __decorate([
    graphql_1.ArgsType()
], SignUpArgs);
exports.SignUpArgs = SignUpArgs;
//# sourceMappingURL=sign-up.args.js.map