import { MigrationInterface, QueryRunner } from 'typeorm';

export class date1666055157627 implements MigrationInterface {
  name = 'date1666055157627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updateAt"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "dateCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "dateUpdateat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "dateUpdateat"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "dateCreatedat"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
