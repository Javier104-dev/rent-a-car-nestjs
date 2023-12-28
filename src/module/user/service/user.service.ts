import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { DeleteResult } from 'typeorm';
import { NewUserDto } from '../dto/new.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.getUsers();
  }

  async getUser(id: number): Promise<UserEntity> {
    return this.userRepository.getUser(id);
  }

  async createUser(body: NewUserDto): Promise<UserEntity> {
    return this.userRepository.createUser(body);
  }

  async updateUser(body: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.updateUser(body);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.deleteUser(id);
  }
}
