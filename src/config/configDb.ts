import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

export const configDb: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456789',
  database: 'prueba',
  entities: [UserEntity],
  // synchronize: true,
};
