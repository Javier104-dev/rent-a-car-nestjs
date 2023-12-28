import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class DbCarDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  kms: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  passengers: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  img: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
