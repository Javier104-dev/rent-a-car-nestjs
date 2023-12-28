import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NewUserDto {
  @Expose({ name: 'first_name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @Expose({ name: 'phone_number' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;
}
