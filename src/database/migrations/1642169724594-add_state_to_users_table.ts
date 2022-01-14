import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addStateToUsersTable1642169724594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'state',
        type: 'enum',
        enum: ['ONLINE', 'IDLE', 'OFFLINE'],
        default: "'OFFLINE'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'state');
  }
}
