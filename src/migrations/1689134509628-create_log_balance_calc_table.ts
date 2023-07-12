import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLogBalanceCalcTable1689134509628
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'log_balance_calc',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'entity_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'job_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'retry',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'status',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'error',
            type: 'json',
            isNullable: true,
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
    await queryRunner.dropTable('log_balance_calc', true);
  }
}
