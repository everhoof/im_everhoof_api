import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class addDeletedFieldsToMessagesTable1607203587481 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
