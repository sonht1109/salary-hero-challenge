import { EnumCompanySalaryCalcMethod } from '../common/enums';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateCompanyTable1688916429751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'salary_calc_method',
            type: 'varchar',
            enum: [
              EnumCompanySalaryCalcMethod.DAILY,
              EnumCompanySalaryCalcMethod.MONTHLY,
            ],
            default: `'${EnumCompanySalaryCalcMethod.MONTHLY}'`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    const checkWorkerCompanyColumn = await queryRunner.hasColumn(
      'worker',
      'company_id',
    );
    if (!checkWorkerCompanyColumn) {
      await queryRunner.addColumn(
        'worker',
        new TableColumn({
          name: 'company_id',
          type: 'varchar',
        }),
      );

      await queryRunner.createForeignKey(
        'worker',
        new TableForeignKey({
          columnNames: ['company_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'company',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const checkWorkerCompanyColumn = await queryRunner.hasColumn(
      'worker',
      'company_id',
    );
    if (checkWorkerCompanyColumn) {
      const table = await queryRunner.getTable('worker');
      const fk = table.foreignKeys.find((fk: TableForeignKey) =>
        fk.columnNames.includes('company_id'),
      );
      if (fk) {
        await queryRunner.dropForeignKey('worker', fk);
      }
      await queryRunner.dropColumn('worker', 'company_id');
    }

    await queryRunner.dropTable('company', true);
  }
}
