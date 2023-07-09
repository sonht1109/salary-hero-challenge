import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'balance' })
export class BalanceEntity extends BaseEntity {
  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'period_from' })
  periodFrom: Date;

  @Column({ name: 'period_to' })
  periodTo: Date;
}
