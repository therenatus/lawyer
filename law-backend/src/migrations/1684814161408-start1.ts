import { MigrationInterface, QueryRunner } from "typeorm";

export class start11684814161408 implements MigrationInterface {
    name = 'start11684814161408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "price" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "price"`);
    }

}
