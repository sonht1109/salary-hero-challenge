import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { WorkerEntity } from './worker.entity';

@Entity({ name: 'attendance' })
export class AttendanceEntity extends BaseEntity {
  @Column({ name: 'checkin_at' })
  checkinAt: Date;

  @Column({ name: 'checkout_at' })
  checkoutAt: Date;

  @ManyToOne(() => WorkerEntity)
  @JoinColumn({ name: 'worker_id' })
  worker: WorkerEntity;

  @Column({ name: 'worker_id' })
  workerId: string;
}
