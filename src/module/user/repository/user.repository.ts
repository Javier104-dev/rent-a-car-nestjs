import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update.user.dto';
import { plainToInstance } from 'class-transformer';
import { DbUserDto } from '../dto/db.user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<DbUserDto[]> {
    const users = await this.userEntity.find();
    const usersDto = plainToInstance(DbUserDto, users);
    return usersDto;
  }

  async getUser(id: number): Promise<DbUserDto> {
    const user = await this.userEntity.findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(`No se encontraron usuarios con id:${id}`);

    const userDto = plainToInstance(DbUserDto, user);
    return userDto;
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

    const updatedUser = await this.userEntity.save(user);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    try {
      const user = await this.userEntity.delete(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se puede eliminar el usuario con id: ${id} porque tiene reservas activas`,
      );
    }
  }
}
