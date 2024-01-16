import { Test, TestingModule } from '@nestjs/testing';
import { CarRepository } from '../../../src/module/car/repository/car.repository';
import { CarService } from '../../../src/module/car/service/car.service';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { UpdateCarDto } from 'src/module/car/dto/update.car.dto';
import { NewCarDto } from 'src/module/car/dto/new.car.dto';
import { DeleteResult } from 'typeorm';

describe('CarController', () => {
  let carService: CarService;
  let carRepository: CarRepository;

  const mockCarRepository = {
    getCars: jest.fn(),
    getCar: jest.fn(),
    createCar: jest.fn(),
    updateCar: jest.fn(),
    deleteCar: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        { provide: CarRepository, useValue: mockCarRepository },
      ],
      imports: [],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carRepository = moduleRef.get<CarRepository>(CarRepository);
  });

  it('should be defined', () => {
    expect(carService).toBeDefined();
  });

  describe('getCars', () => {
    it('Call the getCars method of the CarRepository layer and return an array of DbCarDto entities', async () => {
      const mockCars: DbCarDto[] = [];
      jest.spyOn(carRepository, 'getCars').mockResolvedValue(mockCars);
      const result = await carService.getCars();

      expect(carRepository.getCars).toHaveBeenCalled();
      expect(result).toEqual(mockCars);
    });
  });

  describe('getCar', () => {
    it('Call the getCar method of the CarRepository layer and return a DbCarDto entity', async () => {
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

      jest.spyOn(carRepository, 'getCar').mockResolvedValue(mockGetCarDto);
      const result = await carService.getCar(id);

      expect(carRepository.getCar).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockGetCarDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('createCar', () => {
    it('Call the createCar method of the CarRepository layer and return a new DbCarDto entity', async () => {
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

      const mockNewCarDto: DbCarDto = {
        id: 121,
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

      jest.spyOn(carRepository, 'createCar').mockResolvedValue(mockNewCarDto);
      const result = await carService.createCar(newCar);

      expect(carRepository.createCar).toHaveBeenCalledWith(newCar);
      expect(result).toEqual(mockNewCarDto);
    });
  });

  describe('updateCar', () => {
    it('Call the updateCar method of the CarRepository layer and it should return an updated DbCarDto entity', async () => {
      const updateCar: UpdateCarDto = {
        id: 5,
        brand: 'brand2',
        model: 'model2',
        year: 1995,
        kms: 2000,
        color: 'blue',
        passengers: 4,
        price: 2000,
      };

      const mockUpdatedCarDto: DbCarDto = {
        id: 5,
        brand: 'brand2',
        model: 'model2',
        year: 1995,
        kms: 2000,
        color: 'blue',
        passengers: 4,
        price: 2000,
        img: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(carRepository, 'updateCar')
        .mockResolvedValue(mockUpdatedCarDto);
      const result = await carService.updateCar(updateCar);

      expect(carRepository.updateCar).toHaveBeenCalledWith(updateCar);
      expect(result).toEqual(mockUpdatedCarDto);
      expect(result.id).toEqual(updateCar.id);
    });
  });

  describe('deleteCar', () => {
    it('Call the deleteCar method of the CarRepository layer and return the deleted Dto entity', async () => {
      const id = 4454;
      const deleteResult: DeleteResult = {
        raw: undefined,
        affected: 1,
      };

      jest.spyOn(carRepository, 'deleteCar').mockResolvedValue(deleteResult);
      const result = await carService.deleteCar(id);

      expect(carRepository.deleteCar).toHaveBeenCalledWith(id);
      expect(result).toEqual(deleteResult);
    });
  });
});
