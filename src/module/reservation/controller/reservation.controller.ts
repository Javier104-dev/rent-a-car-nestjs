import { Controller, Get } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { ReservationEntity } from '../entity/reservation.entity';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations(): Promise<ReservationEntity[]> {
    const reservations = await this.reservationService.getReservations();
    return reservations;
  }
}
