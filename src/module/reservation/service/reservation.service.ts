import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../repository/reservation.repository';
import { ReservationEntity } from '../entity/reservation.entity';
import { ReservationDto } from '../dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async getReservations(): Promise<ReservationEntity[]> {
    return this.reservationRepository.getReservations();
  }

  async getReservation(id: number): Promise<ReservationEntity> {
    return this.reservationRepository.getReservation(id);
  }

  async createReservation(body: ReservationDto): Promise<ReservationEntity> {
    return this.reservationRepository.createReservation(body);
  }
}
