import { Test, TestingModule } from '@nestjs/testing';
import { CarEntity } from '../../../src/module/car/entity/car.entity';
import { CarRepository } from '../../../src/module/car/repository/car.repository';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NewCarDto } from 'src/module/car/dto/new.car.dto';
import { UpdateCarDto } from 'src/module/car/dto/update.car.dto';

describe('CarRepository', () => {
  let carRepository: CarRepository;

  const mockCarsDto: DbCarDto[] = [];
  const mockCarDto: DbCarDto = {
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
  const mockNewCarDto: NewCarDto = {
    brand: 'brand',
    model: 'model',
    year: 1995,
    kms: 2000,
    color: 'red',
    passengers: 4,
    price: 2000,
    img: null,
  };
  const mockUpdateCarDto: UpdateCarDto = {
    id: 5,
    ...mockNewCarDto,
  };
  const mockDeleteResult: DeleteResult = {
    raw: undefined,
    affected: 1,
  };

  const mockCarEntity = {
    find: jest.fn().mockReturnValue(mockCarsDto),
    findOne: jest.fn().mockReturnValue(mockCarDto),
    create: jest.fn().mockReturnValue(mockNewCarDto),
    preload: jest.fn().mockReturnValue(mockUpdateCarDto),
    save: jest.fn().mockReturnValue(mockCarDto),
    delete: jest.fn().mockReturnValue(mockDeleteResult),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CarRepository,
        { provide: getRepositoryToken(CarEntity), useValue: mockCarEntity },
      ],
    }).compile();

    carRepository = moduleRef.get<CarRepository>(CarRepository);
  });

  it('should be defined', () => {
    expect(carRepository).toBeDefined();
  });

  describe('getCars', () => {
    it('Call TypeOrm find method and returns an array of DbCarDto entities', async () => {
      jest.spyOn(mockCarEntity, 'find');
      const result = await carRepository.getCars();

      expect(mockCarEntity.find).toHaveBeenCalled();
      expect(result).toEqual(mockCarsDto);
    });
  });

  describe('getCar', () => {
    it('Call the TypeOrm findOne method and returns a DbCarDto entity', async () => {
      const id = 5;
      jest.spyOn(mockCarEntity, 'findOne');
      const result = await carRepository.getCar(id);

      expect(mockCarEntity.findOne).toHaveBeenCalledWith({ where: { id: 5 } });
      expect(result).toEqual(mockCarDto);
      expect(result.id).toEqual(id);
    });
  });

  describe('createCar', () => {
    it('Call the TypeOrm create and save method and returns a DbCarDto entity', async () => {
      jest.spyOn(mockCarEntity, 'create');
      jest.spyOn(mockCarEntity, 'save');
      const result = await carRepository.createCar(mockNewCarDto);

      expect(mockCarEntity.create).toHaveBeenCalledWith(mockNewCarDto);
      expect(mockCarEntity.save).toHaveBeenCalledWith(mockNewCarDto);
      expect(result).toEqual(mockCarDto);
    });
  });

  describe('updateCar', () => {
    it('Call the TypeOrm preload and save method and returns a DbCarDto entity', async () => {
      jest.spyOn(mockCarEntity, 'preload');
      jest.spyOn(mockCarEntity, 'save');
      const result = await carRepository.updateCar(mockUpdateCarDto);

      expect(mockCarEntity.preload).toHaveBeenCalledWith(mockUpdateCarDto);
      expect(mockCarEntity.save).toHaveBeenCalledWith(mockUpdateCarDto);
      expect(result).toEqual(mockCarDto);
      expect(result.id).toEqual(mockUpdateCarDto.id);
    });
  });

  describe('deleteCar', () => {
    it('Call the TypeOrm delete method and returns a DeleteResult entity', async () => {
      const id = 5;
      jest.spyOn(mockCarEntity, 'delete');
      const result = await carRepository.deleteCar(id);

      expect(mockCarEntity.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockDeleteResult);
    });
  });
});
