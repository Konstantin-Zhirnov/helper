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
exports.NewPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class NewPasswordDto {
}
exports.NewPasswordDto = NewPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6846x1db645xd', description: 'Unique user number' }),
    __metadata("design:type", String)
], NewPasswordDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456', description: "User`s password" }),
    __metadata("design:type", String)
], NewPasswordDto.prototype, "password", void 0);
//# sourceMappingURL=new-password.dto.js.map