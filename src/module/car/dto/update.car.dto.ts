import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  kms: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  passengers: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  img: number;
}
