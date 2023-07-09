import { EnumWorkerType } from '../common/enums';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWorkerTable1688907405649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'worker',
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
            name: 'type',
            type: 'varchar(30)',
            isNullable: false,
            enum: [EnumWorkerType.DAILY, EnumWorkerType.MONTHLY],
            default: `'${EnumWorkerType.MONTHLY}'`,
          },
          {
            name: 'base_salary',
            type: 'numeric',
            precision: 20,
            scale: 4,
            default: 0,
            isNullable: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('worker', true);
  }
}
