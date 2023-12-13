import { Injectable } from '@nestjs/common';
import UserModel from './user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly userModel: UserModel) {}

  getUser(): string {
    return this.userModel.getUser();
  }
}
