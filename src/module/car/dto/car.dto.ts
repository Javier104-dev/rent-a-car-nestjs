import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  year: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  kms: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  passengers: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsNumber()
  @IsOptional()
  img: number;
}
