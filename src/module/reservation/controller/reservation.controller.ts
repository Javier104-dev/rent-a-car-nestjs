import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { CarService } from 'src/module/car/service/car.service';
import { UserService } from 'src/module/user/service/user.service';
import { DbReservationDto } from '../dto/db.Reservation.dto';
import { newReservationDto } from '../dto/new.reservation.dto';
import { ReservationCarUserDto } from '../dto/reservation.car.user.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateReservationDto } from '../dto/update.reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly carService: CarService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getReservations(): Promise<DbReservationDto[]> {
    const reservations = await this.reservationService.getReservations();
    return reservations;
  }

  @Get(':id')
  async getReservation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DbReservationDto> {
    const reservation = await this.reservationService.getReservation(id);
    return reservation;
  }

  @Post()
  async createReservation(
    @Body() body: newReservationDto,
  ): Promise<DbReservationDto> {
    const car = await this.carService.getCar(body.carId);
    const user = await this.userService.getUser(body.userId);
    const reservationDto = plainToInstance(ReservationCarUserDto, {
      car,
      user,
      ...body,
    });
    const newReservation =
      await this.reservationService.createReservation(reservationDto);
    return newReservation;
  }

  @Put(':id')
  async updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: newReservationDto,
  ): Promise<DbReservationDto> {
    const car = await this.carService.getCar(body.carId);
    const user = await this.userService.getUser(body.userId);
    const reservationDto = plainToInstance(UpdateReservationDto, {
      id,
      ...body,
      car,
      user,
    });
    const updatedReservation =
      await this.reservationService.updateReservation(reservationDto);
    return updatedReservation;
  }

  @Delete(':id')
  async deleteReservation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DbReservationDto> {
    const reservation = await this.reservationService.getReservation(id);
    await this.reservationService.deleteReservation(id);
    return reservation;
  }
}
