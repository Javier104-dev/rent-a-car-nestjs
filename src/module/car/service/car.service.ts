import { Injectable } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCars() {
    return this.carRepository.getCars();
  }
}
