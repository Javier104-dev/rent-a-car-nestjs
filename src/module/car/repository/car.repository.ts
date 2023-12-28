import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CarEntity } from '../entity/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { DbCarDto } from '../dto/db.car.dto';
import { NewCarDto } from '../dto/new.car.dto';
import { UpdateCarDto } from '../dto/update.car.dto';

@Injectable()
export class CarRepository {
  constructor(
    @InjectRepository(CarEntity)
    private carEntity: Repository<CarEntity>,
  ) {}

  async getCars(): Promise<DbCarDto[]> {
    const cars = await this.carEntity.find();
    const carsDto = plainToInstance(DbCarDto, cars);
    return carsDto;
  }

  async getCar(id: number): Promise<DbCarDto> {
    const car = await this.carEntity.findOne({ where: { id } });

    if (!car)
      throw new NotFoundException(`No se encontraron autos con el id: ${id}`);

    const carDto = plainToInstance(DbCarDto, car);
    return carDto;
  }

  async createCar(body: NewCarDto): Promise<DbCarDto> {
    const car = this.carEntity.create(body);
    const createdCar = await this.carEntity.save(car);
    const carDto = plainToInstance(DbCarDto, createdCar);
    return carDto;
  }

  async updateCar(body: UpdateCarDto): Promise<DbCarDto> {
    const car = await this.carEntity.preload(body);

    if (!car)
      throw new NotFoundException(
        `No se encontraron autos con el id: ${body.id}`,
      );

    const updatedCar = await this.carEntity.save(body);
    const carDto = plainToInstance(DbCarDto, updatedCar);
    return carDto;
  }

  async deleteCar(id: number): Promise<DeleteResult> {
    try {
      const car = await this.carEntity.delete(id);
      return car;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se puede eliminar el auto con id: ${id} porque tiene reservas activas`,
      );
    }
  }
}
