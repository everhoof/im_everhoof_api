import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreatePictureRepresentationsTable1604707200000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
