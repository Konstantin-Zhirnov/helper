/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfirmDto } from './dto/confirm.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
export declare class UsersController {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    getAll(): Promise<User[]>;
    getOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<User>;
    update(updateFieldObject: {
        [key: string]: string | boolean;
    }, id: string): Promise<User>;
    login(loginDto: LoginDto, response: Response): Promise<User>;
    user(request: Request): Promise<User>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    uploadFile(id: string, file: Express.Multer.File): Promise<{
        photo: string;
    }>;
    confirm(body: ConfirmDto, response: Response): Promise<{
        message: string;
    }>;
    sendEmailForActivation(body: SendEmailDto): Promise<{
        message: string;
    }>;
    sendEmailForPassword(body: SendEmailDto): Promise<{
        message: string;
    }>;
    changePassword(body: ChangePasswordDto): Promise<{
        message: string;
    }>;
    newPassword(body: NewPasswordDto): Promise<{
        message: string;
    }>;
}
