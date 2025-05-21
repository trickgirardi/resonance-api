import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { transactions } from './data/transactions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendUserInfo() {
    return this.appService.sendUserInfo();
  }

  @Post()
  createNewTransaction(@Body() transaction: any) {
    console.log('New transaction received:', transaction);

    transactions.push(transaction);
    console.log('Updated transactions:', transactions);

    return {
      message: 'Transaction created successfully',
      transaction,
    };
  }
}
