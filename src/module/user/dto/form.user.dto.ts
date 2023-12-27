import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class FormUserDto {
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'first_name' })
  firstName: string;
}
