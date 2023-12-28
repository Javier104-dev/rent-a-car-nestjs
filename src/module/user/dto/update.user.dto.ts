import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NewUserDto } from './new.user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(NewUserDto, ['firstName', 'lastName', 'phoneNumber']),
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
