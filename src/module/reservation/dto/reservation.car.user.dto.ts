import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { DbUserDto } from 'src/module/user/dto/db.user.dto';

@Exclude()
export class ReservationCarUserDto {
  @Expose()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  finishDate: Date;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  pricePerDay: number;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  totalPrice: number;

  @Expose()
  @IsNotEmpty()
  car: DbCarDto;

  @Expose()
  @IsNotEmpty()
  user: DbUserDto;
}
