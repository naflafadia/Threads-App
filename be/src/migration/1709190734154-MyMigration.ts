import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1709190734154 implements MigrationInterface {
    name = 'MyMigration1709190734154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userName" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userName" DROP NOT NULL`);
    }

}
