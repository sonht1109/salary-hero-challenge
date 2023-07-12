import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'src/common/configs/datasource';
import { AttendanceEntity } from 'src/common/entities/attendance.entity';
import { BalanceEntity } from 'src/common/entities/balance.entity';
import { CompanyEntity } from 'src/common/entities/company.entity';
import { LogBalanceCalcEntity } from 'src/common/entities/log-balance-calc.entity';
import { WorkerEntity } from 'src/common/entities/worker.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...dataSource }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        return dataSource;
      },
    }),
    TypeOrmModule.forFeature([
      CompanyEntity,
      WorkerEntity,
      BalanceEntity,
      AttendanceEntity,
      LogBalanceCalcEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
