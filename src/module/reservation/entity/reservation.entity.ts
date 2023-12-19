import { CarEntity } from 'src/module/car/entity/car.entity';
import { UserEntity } from 'src/module/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  finish_date: Date;

  @Column({ type: 'float' })
  price_per_day: number;

  @Column({ type: 'float' })
  total_price: number;

  @ManyToOne(() => CarEntity, (car) => car.id)
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
