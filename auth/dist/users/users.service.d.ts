import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { LoginDto } from './dto/login.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfirmDto } from './dto/confirm.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
  private userModel;
  private mailService;
  constructor(userModel: Model<User>, mailService: MailService);
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(userDto: CreateUserDto): Promise<User>;
  remove(id: string): Promise<User>;
  update(
    id: string,
    updateFieldObject: {
      [key: string]: string | boolean;
    },
  ): Promise<User>;
  findOne(loginDto: LoginDto): Promise<User>;
  confirm(linkDto: ConfirmDto): Promise<User>;
  sendEmailForActivation(emailDto: SendEmailDto): Promise<User>;
  sendEmailForPassword(emailDto: SendEmailDto): Promise<User>;
  changePassword(changePasswordDto: ChangePasswordDto): Promise<User>;
  newPassword(newPasswordDto: NewPasswordDto): Promise<User>;
}
