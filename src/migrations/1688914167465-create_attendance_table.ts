import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAttendanceTable1688914167465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            type: 'varchar',
          },
          {
            name: 'worker_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'checkin_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'checkout_at',
            type: 'timestamp',
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
    await queryRunner.dropTable('attendance', true);
  }
}
