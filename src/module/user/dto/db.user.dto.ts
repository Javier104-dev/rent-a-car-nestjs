import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class DbUserDto extends PartialType(UserDto) {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
