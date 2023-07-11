import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const dataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  // logging: process.env.APP_ENV === 'development',
  dropSchema: false,
  connectTimeoutMS: 0,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export default new DataSource({
  ...dataSource,
  migrationsRun: true,
  migrations: ['src/migrations/**/*.{js,ts}'],
});
