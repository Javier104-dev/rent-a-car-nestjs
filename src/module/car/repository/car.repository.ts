import { Injectable, NotFoundException } from '@nestjs/common';
import { CarEntity } from '../entity/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from '../dto/car.dto';
import { UpdateCarDto } from '../dto/update.car.dto';

@Injectable()
export class CarRepository {
  constructor(
    @InjectRepository(CarEntity)
    private carEntity: Repository<CarEntity>,
  ) {}

  async getCars(): Promise<CarEntity[]> {
    const cars = await this.carEntity.find();
    return cars;
  }

  async getCar(id: number): Promise<CarEntity> {
    const car = await this.carEntity.findOne({ where: { id } });

    if (!car)
      throw new NotFoundException(`No se encontraron autos con el id: ${id}`);

    return car;
  }

  async createCar(body: CarDto): Promise<CarEntity> {
    const createdCar = this.carEntity.create(body);
    await this.carEntity.save(createdCar);
    return createdCar;
  }

  async updateCar(body: UpdateCarDto): Promise<CarEntity> {
    const car = await this.carEntity.preload(body);

    if (!car)
      throw new NotFoundException(
        `No se encontraron autos con el id: ${body.id}`,
      );

    const updatedCar = await this.carEntity.save(body);
    return updatedCar;
  }

  async deleteCar(id: number) {
    const car = await this.carEntity.delete(id);
    return car;
  }
}
