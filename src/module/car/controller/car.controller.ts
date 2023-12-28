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
import { CarService } from '../service/car.service';
import { DbCarDto } from '../dto/db.car.dto';
import { NewCarDto } from '../dto/new.car.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateCarDto } from '../dto/update.car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars(): Promise<DbCarDto[]> {
    const cars = await this.carService.getCars();
    return cars;
  }

  @Get(':id')
  async getCar(@Param('id', ParseIntPipe) id: number): Promise<DbCarDto> {
    const car = await this.carService.getCar(id);
    return car;
  }

  @Post()
  async createCar(@Body() body: NewCarDto): Promise<DbCarDto> {
    const createdCar = await this.carService.createCar(body);
    return createdCar;
  }

  @Put(':id')
  async updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: NewCarDto,
  ): Promise<DbCarDto> {
    const carDto = plainToInstance(UpdateCarDto, { id, ...body });
    const updatedCar = await this.carService.updateCar(carDto);
    return updatedCar;
  }

  @Delete(':id')
  async deleteCar(@Param('id', ParseIntPipe) id: number): Promise<DbCarDto> {
    const car = await this.carService.getCar(id);
    await this.carService.deleteCar(id);
    const carDto = plainToInstance(DbCarDto, car);
    return carDto;
  }
}
