import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserCreatedListener {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(payload: {
    email: string;
    name: string;
    token: string;
  }) {
    const { email, name, token } = payload;

    const confirmationUrl = `http://localhost:3001/users/confirm-email?token=${token}`;

    console.log(`Sending email to ${email}...`);

    const info = await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Resonance! Please Confirm Your Email',
      html: `<b>Hey ${name},</b><br><br>Welcome to Resonance! We're excited to have you.<br><br>Please click the link below to confirm your email address:<br><br><a href="${confirmationUrl}">Confirm Email</a>`,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
