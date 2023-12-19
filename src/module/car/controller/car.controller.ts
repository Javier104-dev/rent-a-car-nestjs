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
import { CarEntity } from '../entity/car.entity';
import { CarDto } from '../dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars(): Promise<CarEntity[]> {
    const cars = await this.carService.getCars();
    return cars;
  }

  @Get(':id')
  async getCar(@Param('id', ParseIntPipe) id: number): Promise<CarEntity> {
    const car = await this.carService.getCar(id);
    return car;
  }

  @Post()
  async createCar(@Body() body: CarDto): Promise<CarEntity> {
    const createdCar = await this.carService.createCar(body);
    return createdCar;
  }

  @Put(':id')
  async updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CarDto,
  ): Promise<CarEntity> {
    const car = { id, ...body };
    const updatedCar = await this.carService.updateCar(car);
    return updatedCar;
  }

  @Delete(':id')
  async deleteCar(@Param('id', ParseIntPipe) id: number): Promise<CarEntity> {
    const car = await this.carService.getCar(id);
    await this.carService.deleteCar(id);
    return car;
  }
}
