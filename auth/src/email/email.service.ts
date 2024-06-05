import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

import { getConfirmationTemplate } from './templates/confirmation';

@Injectable()
export class EmailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendUserConfirmationNew(
    name: string,
    email: string,
    link: string,
  ): Promise<any> {
    const url = `${process.env.CLIENT_PATH}confirmation/${link}`;

    await this.resend.emails.send({
      // from: '"Helper.plus" <admin@helper.plus>',
      from: 'onboarding@resend.dev',
      // to: email,
      to: 'kostya.zhirnov@gmail.com',
      subject: 'Welcome to Helper! Confirm your Email',
      html: getConfirmationTemplate(name, url),
    });
  }
}
