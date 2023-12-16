import { Controller, Get } from '@nestjs/common';
import { CarService } from '../service/car.service';

@Controller('/car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars() {
    return await this.carService.getCars();
  }
}
