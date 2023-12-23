import { CarEntity } from 'src/module/car/entity/car.entity';
import { UserEntity } from 'src/module/user/entity/user.entity';

export class Reservation {
  public id: number;
  public startDate: Date;
  public finishDate: Date;
  public pricePerDay: number;
  public totalPrice: number;
  public car: CarEntity;
  public user: UserEntity;

  constructor(
    id: number,
    startDate: Date,
    finishDate: Date,
    pricePerDay: number,
    car: CarEntity,
    user: UserEntity,
  ) {
    this.id = id;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.pricePerDay = pricePerDay;
    this.car = car;
    this.user = user;
  }

  calculateDays() {
    const start = this.startDate;
    const finish = this.finishDate;
    const calculate = new Date(finish).getTime() - new Date(start).getTime();
    return Math.floor(calculate / (1000 * 60 * 60 * 24));
  }

  calculatePriceTotal() {
    this.pricePerDay = this.pricePerDay || this.car.price;
    this.totalPrice = this.pricePerDay * this.calculateDays();
    return this;
  }
}
