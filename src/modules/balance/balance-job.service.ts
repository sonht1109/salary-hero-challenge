import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInMilliseconds, endOfMonth, startOfMonth } from 'date-fns';
import { CompanyEntity } from 'src/common/entities/company.entity';
import { WorkerEntity } from 'src/common/entities/worker.entity';
import { Repository } from 'typeorm';
import { BalanceService } from './balance.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BalanceJobService {
  private readonly BATCH_SIZE = 100;
  constructor(
    @InjectRepository(CompanyEntity)
    private compantRepo: Repository<CompanyEntity>,
    @InjectRepository(WorkerEntity)
    private workerRepo: Repository<WorkerEntity>,
    private balanceService: BalanceService,
  ) {}

  // @Cron('00 00 * * *')
  @Cron('*/10 * * * * *')
  async updateBalances() {
    const startTime = startOfMonth(new Date());
    const endTime = endOfMonth(startTime);
    const companies = await this.compantRepo.find();
    for (const company of companies) {
      if (company) {
        // todo: push queue - mark processing company
        await this.updateBalancesByCompany(company, startTime, endTime);
      }
    }
  }

  async updateBalancesByCompany(
    company: CompanyEntity,
    startTime: Date,
    endTime: Date,
  ) {
    let chunk = [];
    const workers = await this.workerRepo.find({
      where: { companyId: company.id },
    });
    const len = workers.length;

    const start = new Date();
    for (const worker of workers) {
      chunk.push(
        this.balanceService.calcWorkerBalance(
          worker,
          startTime,
          endTime,
          company.salaryCalcMethod,
        ),
      );
      if (chunk.length % this.BATCH_SIZE === 0 || chunk.length === len) {
        await Promise.all(chunk);
        chunk = [];
      }
    }
    const end = new Date();
    console.log(
      'Total exec time: ',
      differenceInMilliseconds(end, start),
      'ms',
    );
  }
}
