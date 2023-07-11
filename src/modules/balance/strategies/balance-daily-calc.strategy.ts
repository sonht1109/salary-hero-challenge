import { WorkerEntity } from 'src/common/entities/worker.entity';
import { IBalanceCalcStrategy } from '../interfaces/balance-calc.interface';

export class BalanceDailyCalcStrategy implements IBalanceCalcStrategy {
  calc(worker: WorkerEntity, attendanceCount: number): number {
    return worker.baseSalary * attendanceCount;
  }
}
