import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';

@Processor('emails')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(
    job: Job<{ email: string; name: string; token: string }>,
  ): Promise<any> {
    console.log(`Sending email to ${job.data.email}...`);
    const confirmationUrl = `http://localhost:3001/users/confirm-email?token=${job.data.token}`;
    const info = await this.mailerService.sendMail({
      to: job.data.email,
      subject: 'Welcome to Resonance! Please Confirm Your Email',
      html: `<b>Hey ${job.data.name},</b><br><br>Welcome to Resonance! We're excited to have you.<br><br>Please click the link below to confirm your email address:<br><br><a href="${confirmationUrl}">Confirm Email</a>`,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
