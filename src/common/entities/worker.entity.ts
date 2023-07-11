import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity({ name: 'worker' })
export class WorkerEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'base_salary' })
  baseSalary: number;
}
