import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../repository/reservation.repository';
import { ReservationEntity } from '../entity/reservation.entity';
import { Reservation } from '../model/entity/reservation';
import { DeleteResult } from 'typeorm';
import { DbReservationDto } from '../dto/db.Reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async getReservations(): Promise<DbReservationDto[]> {
    return this.reservationRepository.getReservations();
  }

  async getReservation(id: number): Promise<DbReservationDto> {
    return this.reservationRepository.getReservation(id);
  }

  // async createReservation(
  //   reservation: Reservation,
  // ): Promise<ReservationEntity> {
  //   reservation.calculatePriceTotal();
  //   return this.reservationRepository.createReservation(reservation);
  // }

  // async updateReservation(reservation: Reservation) {
  //   reservation.calculatePriceTotal();
  //   return this.reservationRepository.updateReservation(reservation);
  // }

  // async deleteReservation(id: number): Promise<DeleteResult> {
  //   return this.reservationRepository.deleteReservation(id);
  // }
}
