import { WorkerEntity } from 'src/common/entities/worker.entity';
import { IBalanceCalcStrategy } from '../interfaces/balance-calc.interface';
import { getDaysInMonth } from 'date-fns';

export class BalanceMonthlyCalcStrategy implements IBalanceCalcStrategy {
  calc(worker: WorkerEntity, attendanceCount: number): number {
    const totalAttendances = getDaysInMonth(new Date());
    // todo: round the result based on currency
    return (worker.baseSalary / totalAttendances) * attendanceCount;
  }
}
