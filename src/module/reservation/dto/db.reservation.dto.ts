import { Transform, plainToInstance } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { DbUserDto } from 'src/module/user/dto/db.user.dto';

export class DbReservationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  finishDate: Date;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  pricePerDay: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsObject()
  @Transform(({ value }) => plainToInstance(DbCarDto, value))
  car: DbCarDto;

  @IsNotEmpty()
  @IsObject()
  @Transform(({ value }) => plainToInstance(DbCarDto, value))
  user: DbUserDto;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
