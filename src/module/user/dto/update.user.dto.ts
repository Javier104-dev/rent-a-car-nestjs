import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;
}
