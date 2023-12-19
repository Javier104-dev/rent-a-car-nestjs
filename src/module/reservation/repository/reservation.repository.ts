import { Injectable } from '@nestjs/common';
import { ReservationEntity } from '../entity/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    console.log(reservations);
    return reservations;
  }
}
