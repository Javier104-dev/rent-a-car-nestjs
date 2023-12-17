import { Injectable } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';
import { CarEntity } from '../entity/car.entity';
import { CarDto } from '../dto/car.dto';

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
}
