import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { ReservationEntity } from '../entity/reservation.entity';
import { ReservationDto } from '../dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations(): Promise<ReservationEntity[]> {
    const reservations = await this.reservationService.getReservations();
    return reservations;
  }

  @Get(':id')
  async getReservation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReservationEntity> {
    const reservation = await this.reservationService.getReservation(id);
    return reservation;
  }

  @Post()
  async createReservation(
    @Body() body: ReservationDto,
  ): Promise<ReservationEntity> {
    console.log(body);
    // const reservation = await this.createReservation(body);
    return;
  }
}
