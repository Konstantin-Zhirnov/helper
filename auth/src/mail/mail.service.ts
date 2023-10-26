import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(name: string, email: string, link: string) {
    const url = `${process.env.CLIENT_PATH}confirmation/${link}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Helper.ca" <kostya.zhirnov@google.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name,
        url,
      },
    });
  }

  async sendUserPassword(name: string, email: string, link: string) {
    const url = `${process.env.CLIENT_PATH}password/${link}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Helper.ca" <kostya.zhirnov@google.com>',
      subject: 'Change your password',
      template: './password',
      context: {
        name,
        url,
      },
    });
  }
}