import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserCreatedListener } from './listeners/user-created.listener';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UserCreatedListener],
})
export class UsersModule {}
