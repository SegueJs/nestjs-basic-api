import { MigrationInterface, QueryRunner } from "typeorm";

export class init1666053736117 implements MigrationInterface {
    name = 'init1666053736117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
    }

}
