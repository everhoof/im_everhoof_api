import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addEmailConfirmedToUsersTable1616862144678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'email_confirmed',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'email_confirmed');
  }
}
