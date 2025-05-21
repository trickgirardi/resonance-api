import { Injectable } from '@nestjs/common';
import { userInfo } from './data/userInfo';

@Injectable()
export class AppService {
  sendUserInfo() {
    return userInfo;
  }
}
