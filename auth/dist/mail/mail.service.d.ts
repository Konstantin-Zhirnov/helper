import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(name: string, email: string, link: string): Promise<void>;
    sendUserPassword(name: string, email: string, link: string): Promise<void>;
}
