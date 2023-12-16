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
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = await this.userService.getUser(id);
    return user;
  }

  @Post()
  async createUser(@Body() body: UserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserDto,
  ): Promise<UserEntity> {
    const user = { id, ...body };
    const updatedUser = await this.userService.updateUser(user);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = await this.userService.getUser(id);
    if (user) {
      await this.userService.deleteUser(id);
      return user;
    }
  }
}
