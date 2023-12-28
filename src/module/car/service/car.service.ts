import { Injectable } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';
import { DeleteResult } from 'typeorm';
import { DbCarDto } from '../dto/db.car.dto';
import { NewCarDto } from '../dto/new.car.dto';
import { UpdateCarDto } from '../dto/update.car.dto';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async getCars(): Promise<DbCarDto[]> {
    return this.carRepository.getCars();
  }

  async getCar(id: number): Promise<DbCarDto> {
    return this.carRepository.getCar(id);
  }

  async createCar(body: NewCarDto): Promise<DbCarDto> {
    return this.carRepository.createCar(body);
  }

  async updateCar(body: UpdateCarDto): Promise<DbCarDto> {
    return this.carRepository.updateCar(body);
  }

  async deleteCar(id: number): Promise<DeleteResult> {
    return this.carRepository.deleteCar(id);
  }
}
