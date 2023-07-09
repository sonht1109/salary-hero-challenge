import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { WorkerEntity } from './worker.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => WorkerEntity, (worker) => worker.company)
  workers: WorkerEntity[];
}
