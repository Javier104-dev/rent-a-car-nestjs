import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class NewCarDto {
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

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  img: number;
}
