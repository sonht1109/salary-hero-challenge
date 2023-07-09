import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from 'src/common/configs/datasource';
import { AttendanceEntity } from 'src/common/entities/attendance.entity';
import { BalanceEntity } from 'src/common/entities/balance.entity';
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
    TypeOrmModule.forFeature([WorkerEntity, BalanceEntity, AttendanceEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
