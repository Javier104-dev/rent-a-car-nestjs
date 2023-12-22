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
  @IsOptional()
  price_per_day: number;

  @IsNumber()
  @IsNotEmpty()
  car_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
