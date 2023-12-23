import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationEntity } from '../entity/reservation.entity';
import { DeleteResult, Repository } from 'typeorm';
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

    if (!reservation)
      throw new NotFoundException(`No se encontraron reservas con id: ${id}`);

    return reservation;
  }

  async createReservation(
    reservation: Reservation,
  ): Promise<ReservationEntity> {
    const createdReservation = this.reservationEntity.create(reservation);
    await this.reservationEntity.save(createdReservation);
    return createdReservation;
  }

  async updateReservation(
    reservation: Reservation,
  ): Promise<ReservationEntity> {
    const newReservation = await this.reservationEntity.preload(reservation);

    if (!newReservation)
      throw new NotFoundException(
        `No se encontraron reservas con id: ${reservation.id}`,
      );

    const updatedReservation =
      await this.reservationEntity.save(newReservation);

    return updatedReservation;
  }

  async deleteReservation(id: number): Promise<DeleteResult> {
    const reservation = await this.reservationEntity.delete(id);
    return reservation;
  }
}
