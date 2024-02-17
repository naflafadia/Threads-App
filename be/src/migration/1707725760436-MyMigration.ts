import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1707725760436 implements MigrationInterface {
    name = 'MyMigration1707725760436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_5dd48182c6704e9946fd08a8ad9"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_256dd2e4946d6768c5583caa072"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_4e536cc11421d0601f282b1796f"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "threadsId"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "number_of_replies"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "threadsId"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo_profile"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "postedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profil_picture" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profil_description" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "update_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_111596eb3f640a4c675ca0b6b9d" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_256dd2e4946d6768c5583caa072" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_704ca745ae134000b58ece3dc58" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_704ca745ae134000b58ece3dc58"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_256dd2e4946d6768c5583caa072"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_111596eb3f640a4c675ca0b6b9d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profil_description"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profil_picture"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "threadId"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "postedAt"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "threadId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "photo_profile" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "updated_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "threadsId" integer`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "updated_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "updated_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "number_of_replies" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "threadsId" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "updated_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "updated_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "created_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "created_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_4e536cc11421d0601f282b1796f" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_256dd2e4946d6768c5583caa072" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_5dd48182c6704e9946fd08a8ad9" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
