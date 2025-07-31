import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from './processors/email.processor';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailProcessor],
})
export class UsersModule {}
