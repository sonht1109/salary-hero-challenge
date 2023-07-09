import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { WorkerModule } from './modules/worker/worker.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [DatabaseModule, WorkerModule, BalanceModule],
})
export class AppModule {}
