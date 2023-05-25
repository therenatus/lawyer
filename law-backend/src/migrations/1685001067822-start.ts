import { MigrationInterface, QueryRunner } from "typeorm";

export class start1685001067822 implements MigrationInterface {
    name = 'start1685001067822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."additional_entity_type_enum" AS ENUM('terminate', 'extend')`);
        await queryRunner.query(`CREATE TABLE "additional_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filePath" character varying, "fileName" character varying, "type" "public"."additional_entity_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "addictionId" uuid, CONSTRAINT "PK_470c2f37c890d19e01f79ace09d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."documents_status_enum" AS ENUM('todo', 'done')`);
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "title" character varying NOT NULL, "contrAgent" character varying NOT NULL, "tagList" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."documents_status_enum" NOT NULL DEFAULT 'todo', "fileName" character varying, "filePath" character varying, "price" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "index" character varying NOT NULL, CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."services_role_enum" AS ENUM('superAdmin', 'admin', 'service')`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" integer NOT NULL, "name" character varying NOT NULL, "shortName" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."services_role_enum" NOT NULL DEFAULT 'service', "edit" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_f019a17cb439406ab185382df9b" UNIQUE ("code"), CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03" UNIQUE ("name"), CONSTRAINT "UQ_be709230328e62bf866064c933d" UNIQUE ("shortName"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "counter_entity" ("id" SERIAL NOT NULL, "number" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_a498b7ec6f2de3472acfb069af6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "additional_entity" ADD CONSTRAINT "FK_92af02d040d963226141521e6e7" FOREIGN KEY ("addictionId") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_2d7e06f29424dbb29a827a7c1b5" FOREIGN KEY ("categoryId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_2d7e06f29424dbb29a827a7c1b5"`);
        await queryRunner.query(`ALTER TABLE "additional_entity" DROP CONSTRAINT "FK_92af02d040d963226141521e6e7"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "counter_entity"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TYPE "public"."services_role_enum"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "documents"`);
        await queryRunner.query(`DROP TYPE "public"."documents_status_enum"`);
        await queryRunner.query(`DROP TABLE "additional_entity"`);
        await queryRunner.query(`DROP TYPE "public"."additional_entity_type_enum"`);
    }

}
