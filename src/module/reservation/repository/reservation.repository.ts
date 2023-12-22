import { Injectable } from '@nestjs/common';
import { ReservationEntity } from '../entity/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../model/entity/reservation';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationEntity: Repository<ReservationEntity>,
  ) {}

  async getReservations(): Promise<ReservationEntity[]> {
    const reservations = await this.reservationEntity.find({
      relations: ['car', 'user'],
    });
    return reservations;
  }

  async getReservation(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationEntity.findOne({
      where: { id },
      relations: ['car', 'user'],
    });
    return reservation;
  }

  async createReservation(body: Reservation): Promise<ReservationEntity> {
    const createdReservation = this.reservationEntity.create(body);
    await this.reservationEntity.save(createdReservation);
    return createdReservation;
  }
}
