import { Injectable } from '@nestjs/common';
import { userInfo } from './data/userInfo';
import { transactions } from './data/transactions';

@Injectable()
export class AppService {
  sendUserInfo() {
    return userInfo;
  }
  createNewTransaction(transaction: any) {
    console.log('New transaction received:', transaction);
    transactions.push(transaction);
    return {
      message: 'Transaction created successfully',
      transaction,
    };
  }
}
