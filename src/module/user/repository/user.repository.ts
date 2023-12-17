import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userEntity.find();
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.userEntity.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`No se encontraron usuarios con id:${id}`);

    return user;
  }

  async createUser(body: UserDto): Promise<UserEntity> {
    const createdUser = this.userEntity.create(body);
    await this.userEntity.save(createdUser);
    return createdUser;
  }

  async updateUser(body: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userEntity.preload(body);
    if (!user)
      throw new NotFoundException(
        `No se encontraron usuarios con id:${body.id}`,
      );

    return this.userEntity.save(user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userEntity.delete(id);
  }
}
