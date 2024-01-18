import { Test, TestingModule } from '@nestjs/testing';
import { CarEntity } from '../../../src/module/car/entity/car.entity';
import { CarRepository } from '../../../src/module/car/repository/car.repository';
import { DbCarDto } from 'src/module/car/dto/db.car.dto';
import { DeleteResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

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
  const mockDeleteResult: DeleteResult = {
    raw: undefined,
    affected: 1,
  };

  const mockCarEntity = {
    find: jest.fn().mockReturnValue(mockCarsDto),
    findOne: jest.fn().mockReturnValue(mockCarDto),
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
    it('Calls TypeOrm find method and returns an array of DbCarDto entities', async () => {
      jest.spyOn(mockCarEntity, 'find');
      const result = await carRepository.getCars();

      expect(mockCarEntity.find).toHaveBeenCalled();
      expect(result).toEqual(mockCarsDto);
    });
  });
});
