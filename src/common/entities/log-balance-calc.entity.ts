import { Column, Entity } from 'typeorm';
import { EnumProcessStatus } from '../enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'log_balance_calc' })
export class LogBalanceCalcEntity extends BaseEntity {
  @Column({ name: 'entity_id', nullable: true })
  entityId: string;

  @Column({ name: 'job_id', nullable: true })
  jobId: string;

  @Column({ name: 'retry' })
  retry: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EnumProcessStatus,
    default: EnumProcessStatus.CREATED,
  })
  status: EnumProcessStatus;

  @Column({ name: 'error', nullable: true })
  error: string;
}
