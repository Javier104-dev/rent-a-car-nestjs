import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserModel {
  getUser(): string {
    return 'prueba user';
  }
}
