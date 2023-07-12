import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { endOfMonth, startOfMonth, subDays } from 'date-fns';
import { CompanyEntity } from 'src/common/entities/company.entity';
import { EnumQueueName } from 'src/common/enums';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceJobService {
  constructor(
    @InjectRepository(CompanyEntity)
    private compantRepo: Repository<CompanyEntity>,
    @InjectQueue(EnumQueueName.BALANCE_CALC) private balanceCalcQueue: Queue,
  ) {}

  /**
   * job that run every midnight to handle balance update
   * you can update cronTime to run every 10s for testing
   */
  @Cron('00 00 * * *')
  // @Cron('*/10 * * * * *')
  async updateBalances() {
    const startTime = startOfMonth(subDays(new Date(), 1));
    const endTime = endOfMonth(startTime);
    const companies = await this.compantRepo.find();
    for (const company of companies) {
      if (company) {
        await this.balanceCalcQueue.add(
          { company, startTime, endTime },
          {
            jobId: `balance-calc--${company.id}`,
            removeOnComplete: true,
            removeOnFail: true,
          },
        );
      }
    }
  }
}
