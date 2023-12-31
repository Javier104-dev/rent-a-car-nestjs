import { PartialType } from '@nestjs/mapped-types';
import { ReservationCarUserDto } from './reservation.car.user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateReservationDto extends PartialType(ReservationCarUserDto) {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
