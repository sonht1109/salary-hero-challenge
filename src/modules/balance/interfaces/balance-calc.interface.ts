import { WorkerEntity } from 'src/common/entities/worker.entity';

export interface IBalanceCalcStrategy {
  /**
   *
   * @param worker {WorkerEntity}
   * @param attendanceCount {number} number of attendances from start of month to now
   */
  calc(worker: WorkerEntity, attendanceCount: number): number;
}
