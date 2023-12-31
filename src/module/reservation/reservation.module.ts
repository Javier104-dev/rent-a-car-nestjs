import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entity/reservation.entity';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { ReservationRepository } from './repository/reservation.repository';
import { UserModule } from '../user/user.module';
import { CarModule } from '../car/car.module';
import { ReservationUtility } from './utility/reservation.utiliy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]),
    CarModule,
    UserModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationUtility, ReservationService, ReservationRepository],
})
export class ReservationModule {}
