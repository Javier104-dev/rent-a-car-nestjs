import { CarEntity } from 'src/module/car/entity/car.entity';
import { UserEntity } from 'src/module/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'finish_date' })
  finishDate: Date;

  @Column({ name: 'price_per_day', type: 'float' })
  pricePerDay: number;

  @Column({ type: 'float' })
  total_price: number;

  @ManyToOne(() => CarEntity, (car) => car.id)
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
