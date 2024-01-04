import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CarEntity } from 'src/module/car/entity/car.entity';
import { ReservationEntity } from 'src/module/reservation/entity/reservation.entity';
import { UserEntity } from 'src/module/user/entity/user.entity';

export const configDb = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, CarEntity, ReservationEntity],
    retryDelay: 3000,
  };

  if (configService.get('NODE_ENV') === 'production') return typeOrmOptions;

  if (configService.get('NODE_ENV') === 'development')
    return {
      ...typeOrmOptions,
      logging: true,
      synchronize: true,
    };
};
