import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { WorkerEntity } from './worker.entity';
import { EnumCompanySalaryCalcMethod } from '../enums';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => WorkerEntity, (worker) => worker.company)
  workers: WorkerEntity[];

  @Column({
    name: 'salary_calc_method',
    type: 'enum',
    enum: EnumCompanySalaryCalcMethod,
  })
  salaryCalcMethod: EnumCompanySalaryCalcMethod;
}
