import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { Contact } from '../../contacts/entities/contact.entity';

@Processor('emails')
export class NotificationEmailProcessor extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(
    job: Job<{ email: string; name: string; contacts: Contact[] }>,
  ): Promise<any> {
    if (job.name === 'send-notification-email') {
      console.log(`Sending notification email to ${job.data.email}...`);

      const contactsList = job.data.contacts
        .map(contact => `<li>${contact.name}</li>`)
        .join('');

      const info = await this.mailerService.sendMail({
        to: job.data.email,
        subject: 'Time to reconnect!',
        html: `<b>Hey ${job.data.name},</b><br><br>It's been a while since you've connected with some of your contacts. Take some time to reconnect with them:<br><br><ul>${contactsList}</ul>`,
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  }
}
