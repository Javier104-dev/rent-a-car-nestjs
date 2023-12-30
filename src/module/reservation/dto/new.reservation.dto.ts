import { Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class newReservationDto {
  @IsNotEmpty()
  @Expose({ name: 'start_date' })
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @Expose({ name: 'finish_date' })
  @IsDateString()
  finishDate: Date;

  @Expose({ name: 'price_per_day', toPlainOnly: true })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  pricePerDay: number;

  @IsNotEmpty()
  @Expose({ name: 'car_id' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  carId: number;

  @IsNotEmpty()
  @Expose({ name: 'user_id' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  userId: number;
}
