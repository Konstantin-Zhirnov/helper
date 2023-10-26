import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as uuid from 'uuid';

import { ValidationPipe } from '../pipes/validation.pipe';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SendEmailDto } from './dto/send-email.dto'
import { ConfirmDto } from './dto/confirm.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { NewPasswordDto } from './dto/new-password.dto'

const getUserWithoutPassword = (user: User) => {
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
  }
}


@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('users')
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }


  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('users/:id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }


  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post('users')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<{message: string}> {
    const pretendToUser = await this.usersService.findOne({email: createUserDto.email} as LoginDto);
    if (pretendToUser) {
      throw new BadRequestException('A user with this email already exists!');
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


  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: User })
  @Delete('users/:id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }


  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 201, type: User })
  @Put('users/:id')
  async update(
    @Body() updateFieldObject: {[key: string]: string | boolean},
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.usersService.update(id, updateFieldObject);

    return getUserWithoutPassword(user)
  }


  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = await this.usersService.findOne(loginDto);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isActivated) {
      throw new BadRequestException('You need to confirm your email');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }


  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @Get('user')
  async user(@Req() request: Request): Promise<User> {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.getById(data['id']);
      return getUserWithoutPassword(user)

    } catch (e) {
      throw new UnauthorizedException();
    }
  }


  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 201, type: User })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<{message: string}> {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }


  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({ status: 201, type: User })
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
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
    }) as any,
  )
  async uploadFile(
    @Body() id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    const fieldForUpdate = {
      photo: `${process.env.SERVER_PATH}${file.filename}`
    };

    const user = await this.usersService.update(id, fieldForUpdate);
    return getUserWithoutPassword(user)
  }

  @ApiOperation({ summary: 'Confirmation' })
  @ApiResponse({ status: 201, type: User })
  @Post('confirmation')
  async confirm(@Body() body: ConfirmDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.usersService.confirm(body);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return { message: 'success' };
  }


  @ApiOperation({ summary: 'Send activation link' })
  @ApiResponse({ status: 201, type: User })
  @Post('activation')
  async sendEmailForActivation(
    @Body() body: SendEmailDto,
  ): Promise<{message: string}> {
    const user = await this.usersService.sendEmailForActivation(body);
    if (!user) {
      throw new BadRequestException('There is no user with such an email');
    }

    return { message: 'Activation link successfully sent' };
  }


  @ApiOperation({ summary: 'Send link for changing password' })
  @ApiResponse({ status: 201, type: User })
  @Post('password')
  async sendEmailForPassword(
    @Body() body: SendEmailDto,
  ): Promise<{message: string}> {
    const user = await this.usersService.sendEmailForPassword(body);
    if (!user) {
      throw new BadRequestException('There is no user with such an email');
    }

    return { message: 'A link to change the password has been sent to your email' };
  }


  @ApiOperation({ summary: 'Change password if user forgot it' })
  @ApiResponse({ status: 201, type: User })
  @Put('change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
  ): Promise<{message: string}> {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await this.usersService.changePassword({
      password: hashedPassword,
      link: body.link
    });

    if (!user) {
      throw new BadRequestException('The link to change the password is not valid');
    }

    return { message: 'Your password has been successfully changed' };
  }


  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 201, type: User })
  @Put('new-password')
  async newPassword(
    @Body() body: NewPasswordDto,
  ): Promise<{message: string}> {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await this.usersService.newPassword({
      password: hashedPassword,
      _id: body._id
    });

    if (!user) {
      throw new BadRequestException('The link to change the password is not valid');
    }

    return { message: 'Your password has been successfully changed' };
  }
}
