import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

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
  @IsNotEmpty()
  car_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
