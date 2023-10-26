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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid = require("uuid");
const validation_pipe_1 = require("../pipes/validation.pipe");
const users_service_1 = require("./users.service");
const user_schema_1 = require("./schemas/user.schema");
const create_user_dto_1 = require("./dto/create-user.dto");
const login_dto_1 = require("./dto/login.dto");
const send_email_dto_1 = require("./dto/send-email.dto");
const confirm_dto_1 = require("./dto/confirm.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const new_password_dto_1 = require("./dto/new-password.dto");
const getUserWithoutPassword = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: '',
        phone: user.phone,
        whatsapp: user.whatsapp,
        telegram: user.telegram,
        viber: user.viber,
        photo: user.photo,
        isActivated: user.isActivated,
        linkForActivated: user.linkForActivated,
        changePasswordLink: '',
        paid: user.paid,
        paidTime: user.paidTime
    };
};
let UsersController = class UsersController {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    getAll() {
        return this.usersService.getAll();
    }
    getOne(id) {
        return this.usersService.getById(id);
    }
    async create(createUserDto) {
        const pretendToUser = await this.usersService.findOne({ email: createUserDto.email });
        if (pretendToUser) {
            throw new common_1.BadRequestException('A user with this email already exists!');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        await this.usersService.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashedPassword,
            phone: createUserDto.phone,
            whatsapp: createUserDto.whatsapp,
            telegram: createUserDto.telegram,
            viber: createUserDto.viber,
            photo: createUserDto.photo,
            isActivated: false,
            linkForActivated: createUserDto.linkForActivated,
            changePasswordLink: '',
            paid: createUserDto.paid,
            paidTime: createUserDto.paidTime
        });
        return {
            message: 'success',
        };
    }
    remove(id) {
        return this.usersService.remove(id);
    }
    async update(updateFieldObject, id) {
        const user = await this.usersService.update(id, updateFieldObject);
        return getUserWithoutPassword(user);
    }
    async login(loginDto, response) {
        const user = await this.usersService.findOne(loginDto);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (!(await bcrypt.compare(loginDto.password, user.password))) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (!user.isActivated) {
            throw new common_1.BadRequestException('You need to confirm your email');
        }
        const jwt = await this.jwtService.signAsync({ id: user._id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return user;
    }
    async user(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.usersService.getById(data['id']);
            return getUserWithoutPassword(user);
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'success',
        };
    }
    async uploadFile(id, file) {
        const fieldForUpdate = {
            photo: `${process.env.SERVER_PATH}${file.filename}`
        };
        const user = await this.usersService.update(id, fieldForUpdate);
        return getUserWithoutPassword(user);
    }
    async confirm(body, response) {
        const user = await this.usersService.confirm(body);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({ id: user._id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return { message: 'success' };
    }
    async sendEmailForActivation(body) {
        const user = await this.usersService.sendEmailForActivation(body);
        if (!user) {
            throw new common_1.BadRequestException('There is no user with such an email');
        }
        return { message: 'Activation link successfully sent' };
    }
    async sendEmailForPassword(body) {
        const user = await this.usersService.sendEmailForPassword(body);
        if (!user) {
            throw new common_1.BadRequestException('There is no user with such an email');
        }
        return { message: 'A link to change the password has been sent to your email' };
    }
    async changePassword(body) {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const user = await this.usersService.changePassword({
            password: hashedPassword,
            link: body.link
        });
        if (!user) {
            throw new common_1.BadRequestException('The link to change the password is not valid');
        }
        return { message: 'Your password has been successfully changed' };
    }
    async newPassword(body) {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const user = await this.usersService.newPassword({
            password: hashedPassword,
            _id: body._id
        });
        if (!user) {
            throw new common_1.BadRequestException('The link to change the password is not valid');
        }
        return { message: 'Your password has been successfully changed' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_schema_1.User] }),
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one user by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create user' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Post)('users'),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Put)('users/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "user", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Logout' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload file' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public',
            filename: (req, file, callback) => {
                const uniqueSuffix = uuid.v4();
                const extname = (str) => {
                    const result = str.split('.');
                    return result[result.length - 1];
                };
                const ext = extname(file.originalname);
                const filename = `${uniqueSuffix}.${ext}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Confirmation' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Post)('confirmation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_dto_1.ConfirmDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirm", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send activation link' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Post)('activation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendEmailForActivation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send link for changing password' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Post)('password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendEmailForPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Change password if user forgot it' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Put)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Change password' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_schema_1.User }),
    (0, common_1.Put)('new-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "newPassword", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], UsersController);
//# sourceMappingURL=users.controller.js.map