import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { BalanceJobService } from './balance-job.service';
import { BullModule } from '@nestjs/bull';
import { EnumQueueName } from 'src/common/enums';
import { BalanceCalcConsumer } from './balance-calc.consumer';

@Module({
  imports: [BullModule.registerQueue({ name: EnumQueueName.BALANCE_CALC })],
  providers: [BalanceService, BalanceJobService, BalanceCalcConsumer],
  controllers: [BalanceController],
  exports: [BalanceService],
})
export class BalanceModule {}
