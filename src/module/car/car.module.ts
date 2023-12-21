import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entity/car.entity';
import { CarController } from './controller/car.controller';
import { CarService } from './service/car.service';
import { CarRepository } from './repository/car.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService],
})
export class CarModule {}
