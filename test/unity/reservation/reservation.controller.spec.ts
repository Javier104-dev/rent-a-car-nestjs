import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../../../src/module/reservation/controller/reservation.controller';
import { ReservationService } from '../../../src/module/reservation/service/reservation.service';
import { CarService } from '../../../src/module/car/service/car.service';
import { UserService } from '../../../src/module/user/service/user.service';

describe('ReservationController', () => {
  let reservationController: ReservationController;
  let reservationService: ReservationService;
  let carService: CarService;
  let userService: UserService;

  const mockCarService = {
    getCar: jest.fn(),
  };
  const MockUserService = {
    getUser: jest.fn(),
  };
  const mockReservationService = {
    getReservations: jest.fn(),
    getReservation: jest.fn(),
    createReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        { provide: CarService, useValue: mockCarService },
        { provide: UserService, useValue: MockUserService },
        { provide: ReservationService, useValue: mockReservationService },
      ],
    }).compile();

    reservationController = moduleRef.get<ReservationController>(
      ReservationController,
    );
    carService = moduleRef.get<CarService>(CarService);
    userService = moduleRef.get<UserService>(UserService);
    reservationService = moduleRef.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(reservationController).toBeDefined();
  });
});
