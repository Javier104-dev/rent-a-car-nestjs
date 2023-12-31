import { Injectable } from '@nestjs/common';
import { ReservationCarUserDto } from '../dto/reservation.car.user.dto';
import { UpdateReservationDto } from '../dto/update.reservation.dto';

@Injectable()
export class ReservationUtility {
  calculateDays(
    reservation: ReservationCarUserDto | UpdateReservationDto,
  ): number {
    const start = reservation.startDate;
    const finish = reservation.finishDate;
    const calculate = new Date(finish).getTime() - new Date(start).getTime();
    return Math.floor(calculate / (1000 * 60 * 60 * 24));
  }

  calculatePriceTotal(
    reservation: ReservationCarUserDto | UpdateReservationDto,
  ): void {
    const price = reservation.pricePerDay || reservation.car.price;
    const total = price * this.calculateDays(reservation);

    reservation.pricePerDay = price;
    reservation.totalPrice = total;
  }
}
