import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/common/entities/attendance.entity';
import { BalanceEntity } from 'src/common/entities/balance.entity';
import { WorkerEntity } from 'src/common/entities/worker.entity';
import { EnumCompanySalaryCalcMethod } from 'src/common/enums';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { IBalanceCalcStrategy } from './interfaces/balance-calc.interface';
import { BalanceDailyCalcStrategy } from './strategies/balance-daily-calc.strategy';
import { BalanceMonthlyCalcStrategy } from './strategies/balance-monthlycalc.strategy';

@Injectable()
export class BalanceService {
  private calcStrategies: Map<
    EnumCompanySalaryCalcMethod,
    IBalanceCalcStrategy
  > = new Map();

  constructor(
    @InjectRepository(BalanceEntity)
    private balanceRepo: Repository<BalanceEntity>,

    @InjectRepository(AttendanceEntity)
    private attendanceRepo: Repository<AttendanceEntity>,
  ) {
    this.calcStrategies.set(
      EnumCompanySalaryCalcMethod.DAILY,
      new BalanceDailyCalcStrategy(),
    );
    this.calcStrategies.set(
      EnumCompanySalaryCalcMethod.MONTHLY,
      new BalanceMonthlyCalcStrategy(),
    );
  }

  async calcWorkerBalance(
    worker: WorkerEntity,
    startTime: Date,
    endTime: Date,
    method: EnumCompanySalaryCalcMethod,
  ) {
    const totalAttendances = await this.attendanceRepo.count({
      where: {
        workerId: worker.id,
        checkinAt: MoreThanOrEqual(startTime),
        checkoutAt: LessThanOrEqual(endTime),
      },
    });
    const amount = this.calcStrategies
      .get(method)
      .calc(worker, totalAttendances);

    let currentBalance = await this.balanceRepo.findOne({
      where: { workerId: worker.id, periodFrom: startTime, periodTo: endTime },
    });
    if (!currentBalance) {
      currentBalance = this.balanceRepo.create({
        worker,
        amount,
        periodFrom: startTime,
        periodTo: endTime,
      });
    }

    currentBalance.amount = amount;
    return await this.balanceRepo.save(currentBalance);
  }
}
