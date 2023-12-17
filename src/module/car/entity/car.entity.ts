import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('car')
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  kms: number;

  @Column()
  color: string;

  @Column()
  passengers: number;

  @Column({ nullable: true, default: null, type: 'float' })
  price: number;

  @Column({ nullable: true, default: null })
  img: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
