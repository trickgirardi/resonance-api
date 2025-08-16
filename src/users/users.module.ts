import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { EmailProcessor } from './processors/email.processor';
import { NotificationEmailProcessor } from './processors/notification-email.processor';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'emails',
    }),
    BullBoardModule.forFeature({
      name: 'emails',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailProcessor, NotificationEmailProcessor],
  exports: [BullModule, UsersService],
})
export class UsersModule {}
