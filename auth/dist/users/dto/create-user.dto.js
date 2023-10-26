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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6846x1db645xd', description: 'Unique user number' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Konstantin', description: 'User`s name' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'User`s email' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: 'User`s password' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2501111111', description: 'User`s phone number' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+12501111111', description: 'User`s WhatsApp' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '@kostya_zhirnov', description: 'User`s Telegram' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "telegram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+12501111111', description: 'User`s Viber' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "viber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://image.jpg', description: 'User`s photo' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true', description: 'The user account is activated' }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dzvjndd6552sgbsz', description: 'Link to activate the user account' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "linkForActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dzvjndd6552sgbsz', description: "Link to change the user's password" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "changePasswordLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true', description: "Is the subscription paid for" }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true', description: "Subscription payment time" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "paidTime", void 0);
//# sourceMappingURL=create-user.dto.js.map