import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as uuid from 'uuid'

import { MailService } from '../mail/mail.service'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { NewPasswordDto } from './dto/new-password.dto'
import { LoginDto } from './dto/login.dto'
import { SendEmailDto } from './dto/send-email.dto'
import { ConfirmDto } from './dto/confirm.dto'
import { ChangePasswordDto } from './dto/change-password.dto'


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private mailService: MailService) {
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const userWithActivationLink = { ...userDto, linkForActivated: uuid.v4() }
    const newUser = new this.userModel(userWithActivationLink)
    await this.mailService.sendUserConfirmation(
      userWithActivationLink.name,
      userWithActivationLink.email,
      userWithActivationLink.linkForActivated,
    )
    return newUser.save()
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id)
  }

  async update(id: string, updateFieldObject: { [key: string]: string | boolean }, fieldName: string): Promise<{ fieldName: string, value: string | boolean }> {
    const user = await this.userModel.findByIdAndUpdate(id, updateFieldObject, { new: true })
    return { fieldName, value: user[fieldName] }
  }

  async findOne(loginDto: LoginDto): Promise<User> {
    return this.userModel.findOne({ email: loginDto.email })
  }

  async confirm(linkDto: ConfirmDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ linkForActivated: linkDto.link }, { isActivated: true }, { new: true })
    return this.userModel.findOneAndUpdate({ email: user.email }, { linkForActivated: '' }, { new: true })
  }

  async sendEmailForActivation(emailDto: SendEmailDto): Promise<User> {
    const user = await this.userModel.findOne({ email: emailDto.email })
    if (!user) {
      return null
    }

    await this.mailService.sendUserConfirmation(
      user.name,
      user.email,
      user.linkForActivated,
    )
    return user
  }

  async sendEmailForPassword(emailDto: SendEmailDto): Promise<User> {
    const link = uuid.v4()
    const user = await this.userModel.findOneAndUpdate({ email: emailDto.email }, { changePasswordLink: link }, { new: true })

    if (!user) {
      return null
    }

    await this.mailService.sendUserPassword(
      user.name,
      user.email,
      link,
    )
    return user
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { changePasswordLink: changePasswordDto.link },
      { password: changePasswordDto.password },
      { new: true },
    )
    return user
  }

  async newPassword(newPasswordDto: NewPasswordDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: newPasswordDto._id },
      { password: newPasswordDto.password },
      { new: true },
    )
    return user
  }
}
