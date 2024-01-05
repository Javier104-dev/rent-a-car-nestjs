import { Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class newReservationDto {
  @IsNotEmpty()
  @Expose({ name: 'start-date' })
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @Expose({ name: 'finish-date' })
  @IsDateString()
  finishDate: Date;

  @Expose({ name: 'price-per-day', toPlainOnly: true })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  pricePerDay: number;

  @IsNotEmpty()
  @Expose({ name: 'car-id' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  carId: number;

  @IsNotEmpty()
  @Expose({ name: 'user-id' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  userId: number;
}
