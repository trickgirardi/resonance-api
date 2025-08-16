import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectQueue('emails') private emailsQueue: Queue,
  ) {}

  @Cron('0 8 * * *')
  async handleCron() {
    const users = await this.usersService.findAll();

    for (const user of users) {
      const contactsToNotify = user.contacts.filter(contact => {
        if (!contact.lastInteraction || !contact.contactFrequency) {
          return false;
        }

        const lastInteraction = new Date(contact.lastInteraction);
        const today = new Date();
        const differenceInDays = Math.floor(
          (today.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24),
        );

        return differenceInDays > contact.contactFrequency;
      });

      if (contactsToNotify.length > 0) {
        await this.emailsQueue.add('send-notification-email', {
          email: user.email,
          name: user.name,
          contacts: contactsToNotify,
        });
      }
    }
  }
}
