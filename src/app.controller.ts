import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendUserInfo() {
    return this.appService.sendUserInfo();
  }

  @Post()
  createNewTransaction(@Body() transaction: any) {
    return this.appService.createNewTransaction(transaction);
  }
}
