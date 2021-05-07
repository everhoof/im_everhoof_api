import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class addDiscordSupport1620245717733 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
