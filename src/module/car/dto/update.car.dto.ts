import { PartialType } from '@nestjs/mapped-types';
import { NewCarDto } from './new.car.dto';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCarDto extends PartialType(NewCarDto) {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;
}
