import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NewUserDto {
  @Expose({ name: 'first-name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose({ name: 'last-name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @Expose({ name: 'phone-number' })
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
