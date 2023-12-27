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
import { DbUserDto } from '../dto/db.user.dto';
import { FormUserDto } from '../dto/form.user.dto';

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
  async createUser(@Body() body: FormUserDto): Promise<UserEntity> {
    // const createdUser = await this.userService.createUser(body);
    console.log(body);
    
    return;
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
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DbUserDto> {
    const user = await this.userService.getUser(id);
    await this.userService.deleteUser(id);
    return user;
  }
}
