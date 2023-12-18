import { Injectable } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';
import { CarEntity } from '../entity/car.entity';
import { CarDto } from '../dto/car.dto';
import { UpdateCarDto } from '../dto/update.car.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCars(): Promise<CarEntity[]> {
    return this.carRepository.getCars();
  }

  async getCar(id: number): Promise<CarEntity> {
    return this.carRepository.getCar(id);
  }

  async createCar(body: CarDto): Promise<CarEntity> {
    return this.carRepository.createCar(body);
  }

  async updateCar(body: UpdateCarDto): Promise<CarEntity> {
    return this.carRepository.updateCar(body);
  }

  async deleteCar(id: number): Promise<DeleteResult> {
    return this.carRepository.deleteCar(id);
  }
}
