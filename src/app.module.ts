import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { BalanceModule } from './modules/balance/balance.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DatabaseModule,
    BalanceModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
  ],
})
export class AppModule {}
