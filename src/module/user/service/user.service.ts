/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { DeleteResult } from 'typeorm';
import { DbUserDto } from '../dto/db.user.dto';
import { FormUserDto } from '../dto/form.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<DbUserDto[]> {
    return this.userRepository.getUsers();
  }

  async getUser(id: number): Promise<DbUserDto> {
    return this.userRepository.getUser(id);
  }

  async createUser(body: FormUserDto): Promise<UserEntity> {
    return this.userRepository.createUser(body);
  }

  // async updateUser(body: UpdateUserDto): Promise<UserEntity> {
  //   return this.userRepository.updateUser(body);
  // }

  // async deleteUser(id: number): Promise<DeleteResult> {
  //   return this.userRepository.deleteUser(id);
  // }
}
