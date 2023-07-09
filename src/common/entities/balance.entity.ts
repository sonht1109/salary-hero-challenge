import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { WorkerEntity } from './worker.entity';

@Entity({ name: 'balance' })
export class BalanceEntity extends BaseEntity {
  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'period_from' })
  periodFrom: Date;

  @Column({ name: 'period_to' })
  periodTo: Date;

  @ManyToOne(() => WorkerEntity)
  @JoinColumn({ name: 'worker_id' })
  worker: WorkerEntity;

  @Column({ name: 'worker_id' })
  workerId: string;
}
