import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    UsersModule,
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  providers: [NotificationsService],
})
export class NotificationsModule {}
