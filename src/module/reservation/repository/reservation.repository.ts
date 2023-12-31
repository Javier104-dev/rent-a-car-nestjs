import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservationEntity } from '../entity/reservation.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DbReservationDto } from '../dto/db.Reservation.dto';
import { plainToInstance } from 'class-transformer';
import { ReservationCarUserDto } from '../dto/reservation.car.user.dto';
import { UpdateReservationDto } from '../dto/update.reservation.dto';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationEntity: Repository<ReservationEntity>,
  ) {}

  async getReservations(): Promise<DbReservationDto[]> {
    const reservations = await this.reservationEntity.find({
      relations: ['car', 'user'],
    });
    const reservationsDto = plainToInstance(DbReservationDto, reservations);
    return reservationsDto;
  }

  async getReservation(id: number): Promise<DbReservationDto> {
    const reservation = await this.reservationEntity.findOne({
      where: { id },
      relations: ['car', 'user'],
    });

    if (!reservation)
      throw new NotFoundException(`No se encontraron reservas con id: ${id}`);

    const reservationDto = plainToInstance(DbReservationDto, reservation);
    return reservationDto;
  }

  async createReservation(
    body: ReservationCarUserDto,
  ): Promise<DbReservationDto> {
    const reservation = this.reservationEntity.create(body);
    const createdReservation = await this.reservationEntity.save(reservation);
    const reservartionDto = plainToInstance(
      DbReservationDto,
      createdReservation,
    );
    return reservartionDto;
  }

  async updateReservation(
    body: UpdateReservationDto,
  ): Promise<DbReservationDto> {
    const reservation = await this.reservationEntity.preload(body);

    if (!reservation)
      throw new NotFoundException(
        `No se encontraron reservas con id: ${body.id}`,
      );

    const updatedReservation = await this.reservationEntity.save(reservation);
    const updateDto = plainToInstance(DbReservationDto, updatedReservation);
    return updateDto;
  }

  async deleteReservation(id: number): Promise<DeleteResult> {
    const reservation = await this.reservationEntity.delete(id);
    return reservation;
  }
}
