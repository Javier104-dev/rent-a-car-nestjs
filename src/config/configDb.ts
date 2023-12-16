import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CarEntity } from 'src/module/car/entity/car.entity';
import { UserEntity } from 'src/module/user/entity/user.entity';

export const configDb: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456789',
  database: 'prueba',
  entities: [UserEntity, CarEntity],
  // synchronize: true,
};
