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
import { CarService } from 'src/module/car/service/car.service';
import { UserService } from 'src/module/user/service/user.service';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly carService: CarService,
    private readonly userService: UserService,
  ) {}

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
    const car = await this.carService.getCar(body.car_id);
    const user = await this.userService.getUser(body.user_id);
    const nuevo = {
      car,
      user,
      ...body,
    };
    console.log(nuevo);
    const reservation = await this.reservationService.createReservation(nuevo);
    return reservation;
  }
}
