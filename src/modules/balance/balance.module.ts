import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { BalanceJobService } from './balance-job.service';

@Module({
  providers: [BalanceService, BalanceJobService],
  controllers: [BalanceController],
  exports: [BalanceService],
})
export class BalanceModule {}
