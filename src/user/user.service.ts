import { Injectable } from '@nestjs/common';
import UserRepository from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUser(): string {
    return this.userRepository.getUser();
  }
}
