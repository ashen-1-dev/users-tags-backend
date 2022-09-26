import { MigrationInterface, QueryRunner } from "typeorm";

export class addUsersAndTagsTable1664199527937 implements MigrationInterface {
    name = 'addUsersAndTagsTable1664199527937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "creatorUuid" uuid, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying(30) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "refreshToken" character varying, CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "tag_users_user" ("tagId" integer NOT NULL, "userUuid" uuid NOT NULL, CONSTRAINT "PK_b553d4e064b8149d1a969ae5469" PRIMARY KEY ("tagId", "userUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac2dc02851d77738e7aba2782f" ON "tag_users_user" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_890bda31e69d33bc23df3fb186" ON "tag_users_user" ("userUuid") `);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_9857972d0bb698a79a9a9e1497f" FOREIGN KEY ("creatorUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_users_user" ADD CONSTRAINT "FK_ac2dc02851d77738e7aba2782fe" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_users_user" ADD CONSTRAINT "FK_890bda31e69d33bc23df3fb186e" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_users_user" DROP CONSTRAINT "FK_890bda31e69d33bc23df3fb186e"`);
        await queryRunner.query(`ALTER TABLE "tag_users_user" DROP CONSTRAINT "FK_ac2dc02851d77738e7aba2782fe"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_9857972d0bb698a79a9a9e1497f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_890bda31e69d33bc23df3fb186"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac2dc02851d77738e7aba2782f"`);
        await queryRunner.query(`DROP TABLE "tag_users_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
