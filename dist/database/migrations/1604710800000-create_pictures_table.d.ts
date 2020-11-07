import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreatePicturesTable1604710800000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
