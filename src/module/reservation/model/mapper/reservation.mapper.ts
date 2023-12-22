import { CarEntity } from 'src/module/car/entity/car.entity';
import { Reservation } from '../entity/reservation';
import { UserEntity } from 'src/module/user/entity/user.entity';
import { ReservationDto } from '../../dto/reservation.dto';

export const formToEntity = (
  {
    start_date: startDate,
    finish_date: finishDate,
    price_per_day: pricePerDay,
    total_price: totalPrice,
  }: ReservationDto,
  car: CarEntity,
  user: UserEntity,
) =>
  new Reservation(
    new Date(startDate),
    new Date(finishDate),
    Number(pricePerDay),
    Number(totalPrice),
    car,
    user,
  );
