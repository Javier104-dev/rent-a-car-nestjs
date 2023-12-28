/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { plainToInstance } from 'class-transformer';
import { DbUserDto } from '../dto/db.user.dto';
import { NewUserDto } from '../dto/new.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userEntity.find();
    const usersDto = plainToInstance(DbUserDto, users);
    return usersDto;
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.userEntity.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`No se encontraron usuarios con id:${id}`);

    const userDto = plainToInstance(DbUserDto, user);
    return userDto;
  }

  async createUser(body: NewUserDto): Promise<UserEntity> {
    const user = this.userEntity.create(body);
    const createdUser = await this.userEntity.save(user);
    const userDto = plainToInstance(DbUserDto, createdUser);
    return userDto;
  }

  async updateUser(body: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userEntity.preload(body);
    if (!user)
      throw new NotFoundException(
        `No se encontraron usuarios con id:${body.id}`,
      );

    const updatedUser = await this.userEntity.save(user);
    const userDto = plainToInstance(DbUserDto, updatedUser);
    return userDto;
  }

  // async deleteUser(id: number): Promise<DeleteResult> {
  //   try {
  //     const user = await this.userEntity.delete(id);
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       `No se puede eliminar el usuario con id: ${id} porque tiene reservas activas`,
  //     );
  //   }
  // }
}
