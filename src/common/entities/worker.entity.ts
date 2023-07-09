import { BaseEntity } from './base.entity';
import { EnumWorkerType } from 'src/common/enums';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'worker' })
export class WorkerEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: EnumWorkerType,
    default: EnumWorkerType.MONTHLY,
  })
  type: EnumWorkerType;
}
