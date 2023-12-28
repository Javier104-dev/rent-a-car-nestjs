/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserEntity } from '../entity/user.entity';
import { DbUserDto } from '../dto/db.user.dto';
import { NewUserDto } from '../dto/new.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<DbUserDto[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<DbUserDto> {
    const user = await this.userService.getUser(id);
    return user;
  }

  @Post()
  async createUser(@Body() body: NewUserDto): Promise<UserEntity> {
    const createdUser = await this.userService.createUser(body);
    return createdUser;
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: NewUserDto,
  ): Promise<UserEntity> {
    const userDto = plainToInstance(UpdateUserDto, { id, ...body });
    const updatedUser = await this.userService.updateUser(userDto);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DbUserDto> {
    const user = await this.userService.getUser(id);
    await this.userService.deleteUser(id);
    const userDto = plainToInstance(DbUserDto, user);
    return userDto;
  }
}
