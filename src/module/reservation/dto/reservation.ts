import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { DbUserDto } from 'src/module/user/dto/db.user.dto';

@Exclude()
export class ReservationDto {
  @Expose()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  finishDate: Date;

  @Expose()
  @IsOptional()
  pricePerDay: number;

  @Expose()
  @IsNotEmpty()
  car: DbCarDto;

  @Expose()
  @IsNotEmpty()
  user: DbUserDto;
}
