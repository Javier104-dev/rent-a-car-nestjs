import { PartialType } from '@nestjs/mapped-types';
import { CarDto } from './car.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCarDto extends PartialType(CarDto) {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
