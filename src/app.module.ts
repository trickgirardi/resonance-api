import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './common/database/database.module';
import { ContactsModule } from './contacts/contacts.module';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'erin.davis31@ethereal.email',
          pass: 'vMubeWQRGNQUZZwqZk',
        },
      },
      defaults: {
        from: '"Resonance" <noreply@resonance.com>',
      },
    }),
    UsersModule,
    DatabaseModule,
    ContactsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
