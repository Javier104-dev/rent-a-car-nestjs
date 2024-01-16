import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from '../../../src/module/car/controller/car.controller';
import { CarService } from '../../../src/module/car/service/car.service';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { NewCarDto } from 'src/module/car/dto/new.car.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCarDto } from 'src/module/car/dto/update.car.dto';

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  const mockCarService = {
    getCars: jest.fn(),
    getCar: jest.fn(),
    createCar: jest.fn(),
    updateCar: jest.fn(),
    deleteCar: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [{ provide: CarService, useValue: mockCarService }],
      imports: [],
    }).compile();

    carController = moduleRef.get<CarController>(CarController);
    carService = moduleRef.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
  });

  describe('getCars', () => {
    it('Call the getCars method of the CarService layer and return an array of DbCarDto entities', async () => {
      const mockCars: DbCarDto[] = [];
      jest.spyOn(carService, 'getCars').mockResolvedValue(mockCars);
      const result = await carController.getCars();

      expect(carService.getCars).toHaveBeenCalled();
      expect(result).toEqual(mockCars);
    });
  });

  describe('getCar', () => {
    it('Call the getCar method of the CarService layer and return a DbCarDto entity', async () => {
      const id = 5;
      const mockGetCarDto: DbCarDto = {
        id: 5,
        brand: 'brand',
        model: 'model',
        year: 1995,
        kms: 2000,
        color: 'red',
        passengers: 4,
        price: 2000,
        img: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(carService, 'getCar').mockResolvedValue(mockGetCarDto);
      const result = await carController.getCar(id);

      expect(carService.getCar).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockGetCarDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('createCar', () => {
    it('Call the createCar method of the CarService layer and return a new DbCarDto entity', async () => {
      const newCar: NewCarDto = {
        brand: 'brand',
        model: 'model',
        year: 1995,
        kms: 2000,
        color: 'red',
        passengers: 4,
        price: 2000,
        img: null,
      };

      const mockCreateCarDto: DbCarDto = {
        id: 6,
        brand: 'brand',
        model: 'model',
        year: 1995,
        kms: 2000,
        color: 'red',
        passengers: 4,
        price: 2000,
        img: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(carService, 'createCar').mockResolvedValue(mockCreateCarDto);
      const result = await carController.createCar(newCar);

      expect(carService.createCar).toHaveBeenCalledWith(newCar);
      expect(result).toEqual(mockCreateCarDto);
    });
  });

  describe('updateCar', () => {
    it('Call the updateCar method of the CarService layer and it should return an updated DbCarDto entity', async () => {
      const id = 10;
      const newCar: NewCarDto = {
        brand: 'brand2',
        model: 'model2',
        year: 1995,
        kms: 2000,
        color: 'blue',
        passengers: 4,
        price: 2000,
        img: 0,
      };

      const updateCar: UpdateCarDto = {
        id,
        ...newCar,
      };

      const mockUpdatedCarDto: DbCarDto = {
        id,
        ...newCar,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(carService, 'updateCar').mockResolvedValue(mockUpdatedCarDto);
      const result = await carController.updateCar(id, newCar);

      expect(carService.updateCar).toHaveBeenCalledWith(updateCar);
      expect(result).toEqual(mockUpdatedCarDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('deleteCar', () => {
    it('Call the deleteCar method of the CarService layer and return the deleted Dto entity', async () => {
      const id = 2554554;
      const mockDeleteCarDto: DbCarDto = {
        id: 2554554,
        brand: 'brand',
        model: 'model',
        year: 1995,
        kms: 2000,
        color: 'red',
        passengers: 4,
        price: 2000,
        img: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const deleteResult: DeleteResult = {
        raw: undefined,
        affected: 1,
      };

      jest.spyOn(carService, 'deleteCar').mockResolvedValue(deleteResult);
      jest.spyOn(carService, 'getCar').mockResolvedValue(mockDeleteCarDto);
      const result = await carController.deleteCar(id);

      expect(carService.deleteCar).toHaveBeenCalledWith(id);
      expect(carService.getCar).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDeleteCarDto);
      expect(result.id).toEqual(id);
    });
  });
});
