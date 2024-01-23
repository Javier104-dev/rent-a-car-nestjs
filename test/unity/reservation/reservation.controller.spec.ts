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

  const mockReservationService = {
    getReservations: jest.fn(),
    getReservation: jest.fn(),
    createReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn(),
  };
  const asd = {
    getReservations: jest.fn(),
    getReservation: jest.fn(),
    createReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn(),
  };
  const asd2 = {
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
        { provide: CarService, useValue: asd },
        { provide: UserService, useValue: asd2 },
        { provide: ReservationService, useValue: mockReservationService },
      ],
    }).compile();

    reservationController = moduleRef.get<ReservationController>(
      ReservationController,
    );
    reservationService = moduleRef.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(reservationController).toBeDefined();
  });
});
