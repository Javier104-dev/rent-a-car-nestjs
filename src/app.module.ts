import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDb } from './config/configDb';
import { UserModule } from './module/user/user.module';
import { CarModule } from './module/car/car.module';
import { ReservationModule } from './module/reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configDb(configService);
      },
    }),
    UserModule,
    CarModule,
    ReservationModule,
  ],
})
export class AppModule {}
