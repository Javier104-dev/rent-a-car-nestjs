import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import UserRepository from './user.model';
import UserModel from './user.model';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserModel],
})
export class UserModule {}
