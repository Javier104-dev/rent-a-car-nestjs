import { Injectable } from '@nestjs/common';
import { CarEntity } from '../entity/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarRepository {
  constructor(
    @InjectRepository(CarEntity)
    private carEntity: Repository<CarEntity>,
  ) {}

  async getCars() {
    return this.carEntity.find();
  }
}
