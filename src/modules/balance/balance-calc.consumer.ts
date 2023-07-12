import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerEntity } from 'src/common/entities/worker.entity';
import {
  EnumCompanySalaryCalcMethod,
  EnumProcessStatus,
  EnumQueueName,
} from 'src/common/enums';
import { Repository } from 'typeorm';
import { BalanceService } from './balance.service';
import { CompanyEntity } from 'src/common/entities/company.entity';
import { differenceInMilliseconds } from 'date-fns';
import { Job } from 'bull';
import { LogBalanceCalcEntity } from 'src/common/entities/log-balance-calc.entity';

@Processor(EnumQueueName.BALANCE_CALC)
export class BalanceCalcConsumer {
  private readonly BATCH_SIZE = 100;
  private readonly RETRY_LIMIT = 3;

  constructor(
    @InjectRepository(WorkerEntity)
    private workerRepo: Repository<WorkerEntity>,
    private balanceService: BalanceService,
    @InjectRepository(LogBalanceCalcEntity)
    private logBalanceCalcRepo: Repository<LogBalanceCalcEntity>,
  ) {}

  /**
   * process received job
   * @param job
   */
  @Process()
  async updateBalancesByCompany(
    job: Job<{
      company: CompanyEntity;
      startTime: string;
      endTime: string;
    }>,
  ) {
    const { company, startTime, endTime } = job.data;
    let chunk = [];
    const workers = await this.workerRepo.find({
      where: { companyId: company.id },
    });
    const len = workers.length;

    const start = new Date();
    for (const worker of workers) {
      chunk.push(
        this.handleCalcWorkerBalance(
          worker,
          new Date(startTime),
          new Date(endTime),
          company.salaryCalcMethod,
          job,
        ),
      );
      if (chunk.length % this.BATCH_SIZE === 0 || chunk.length === len) {
        await Promise.all(chunk);
        chunk = [];
      }
    }
    const end = new Date();

    console.log(
      `Job ${job.id.toString()} exec in ${differenceInMilliseconds(
        end,
        start,
      )}ms`,
    );
  }

  /**
   * logic that calculate worker balance and retry on error
   * @param worker {WorkerEntity}
   * @param startTime {Date}
   * @param endTime {Date}
   * @param method {EnumCompanySalaryCalcMethod}
   * @param job {Job} current processing job
   * @param log {LogBalanceCalc}
   * @param retry {number} current retry turn
   */
  async handleCalcWorkerBalance(
    worker: WorkerEntity,
    startTime: Date,
    endTime: Date,
    method: EnumCompanySalaryCalcMethod,
    job: Job,
    log: LogBalanceCalcEntity = null,
    retry = 0,
  ) {
    try {
      if (!log) {
        log = await this.logBalanceCalcRepo.save(
          this.logBalanceCalcRepo.create({
            entityId: worker.id,
            jobId: job.id.toString(),
            retry,
          }),
        );
      }
      await this.balanceService.calcWorkerBalance(
        worker,
        startTime,
        endTime,
        method,
      );
      await this.logBalanceCalcRepo.update(log.id, {
        status: EnumProcessStatus.SUCCESSFUL,
      });
    } catch (e) {
      if (retry < this.RETRY_LIMIT) {
        await this.logBalanceCalcRepo.update(log.id, {
          status: EnumProcessStatus.FAILED,
          retry: retry + 1,
          error: JSON.stringify(e),
        });
        await this.handleCalcWorkerBalance(
          worker,
          startTime,
          endTime,
          method,
          job,
          log,
          retry + 1,
        );
      }
      return;
    }
  }
}
