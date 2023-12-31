import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../repository/reservation.repository';
import { DeleteResult } from 'typeorm';
import { DbReservationDto } from '../dto/db.Reservation.dto';
import { ReservationCarUserDto } from '../dto/reservation.car.user.dto';
import { ReservationUtility } from '../utility/reservation.utiliy';
import { UpdateReservationDto } from '../dto/update.reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly reservationUtility: ReservationUtility,
  ) {}

  async getReservations(): Promise<DbReservationDto[]> {
    return this.reservationRepository.getReservations();
  }

  async getReservation(id: number): Promise<DbReservationDto> {
    return this.reservationRepository.getReservation(id);
  }

  async createReservation(
    body: ReservationCarUserDto,
  ): Promise<DbReservationDto> {
    this.reservationUtility.calculatePriceTotal(body);
    return this.reservationRepository.createReservation(body);
  }

  async updateReservation(
    body: UpdateReservationDto,
  ): Promise<DbReservationDto> {
    this.reservationUtility.calculatePriceTotal(body);
    return this.reservationRepository.updateReservation(body);
  }

  async deleteReservation(id: number): Promise<DeleteResult> {
    return this.reservationRepository.deleteReservation(id);
  }
}
