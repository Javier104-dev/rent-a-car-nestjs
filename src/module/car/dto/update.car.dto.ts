import { PartialType } from '@nestjs/mapped-types';
import { NewCarDto } from './new.car.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCarDto extends PartialType(NewCarDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
