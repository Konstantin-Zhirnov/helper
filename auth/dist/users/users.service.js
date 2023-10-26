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
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const uuid = require("uuid");
const mail_service_1 = require("../mail/mail.service");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel, mailService) {
        this.userModel = userModel;
        this.mailService = mailService;
    }
    async getAll() {
        return this.userModel.find().exec();
    }
    async getById(id) {
        return this.userModel.findById(id);
    }
    async create(userDto) {
        const userWithActivationLink = { ...userDto, linkForActivated: uuid.v4() };
        const newUser = new this.userModel(userWithActivationLink);
        await this.mailService.sendUserConfirmation(userWithActivationLink.name, userWithActivationLink.email, userWithActivationLink.linkForActivated);
        return newUser.save();
    }
    async remove(id) {
        return this.userModel.findByIdAndRemove(id);
    }
    async update(id, updateFieldObject) {
        return this.userModel.findByIdAndUpdate(id, updateFieldObject, { new: true });
    }
    async findOne(loginDto) {
        return this.userModel.findOne({ email: loginDto.email });
    }
    async confirm(linkDto) {
        const user = await this.userModel.findOneAndUpdate({ linkForActivated: linkDto.link }, { isActivated: true }, { new: true });
        return this.userModel.findOneAndUpdate({ email: user.email }, { linkForActivated: '' }, { new: true });
    }
    async sendEmailForActivation(emailDto) {
        const user = await this.userModel.findOne({ email: emailDto.email });
        if (!user) {
            return null;
        }
        await this.mailService.sendUserConfirmation(user.name, user.email, user.linkForActivated);
        return user;
    }
    async sendEmailForPassword(emailDto) {
        const link = uuid.v4();
        const user = await this.userModel.findOneAndUpdate({ email: emailDto.email }, { changePasswordLink: link }, { new: true });
        if (!user) {
            return null;
        }
        await this.mailService.sendUserPassword(user.name, user.email, link);
        return user;
    }
    async changePassword(changePasswordDto) {
        const user = await this.userModel.findOneAndUpdate({ changePasswordLink: changePasswordDto.link }, { password: changePasswordDto.password }, { new: true });
        return user;
    }
    async newPassword(newPasswordDto) {
        const user = await this.userModel.findOneAndUpdate({ _id: newPasswordDto._id }, { password: newPasswordDto.password }, { new: true });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map