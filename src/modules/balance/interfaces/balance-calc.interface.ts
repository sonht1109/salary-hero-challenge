import { WorkerEntity } from 'src/common/entities/worker.entity';

export interface IBalanceCalcStrategy {
  calc(worker: WorkerEntity, totalAttendances: number): number;
}
