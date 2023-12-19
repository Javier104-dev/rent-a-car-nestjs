import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ReservationDto {
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  finish_date: Date;

  @IsNumber()
  @IsNotEmpty()
  price_per_day: number;

  @IsNumber()
  @IsNotEmpty()
  total_price: number;

  @IsNumber()
  @IsOptional()
  car_id: number;

  @IsNumber()
  @IsOptional()
  user_id: number;
}
