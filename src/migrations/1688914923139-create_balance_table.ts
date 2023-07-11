import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBalanceTable1688914923139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'balance',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'worker_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'period_from',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'period_to',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'numeric',
            isNullable: false,
            precision: 20,
            scale: 4,
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
        foreignKeys: [
          {
            columnNames: ['worker_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'worker',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('balance', true);
  }
}
