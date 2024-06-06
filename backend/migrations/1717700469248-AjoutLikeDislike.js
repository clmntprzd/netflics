import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AjoutLikeDislike1717700469248 {
    name = 'AjoutLikeDislike1717700469248'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_likes_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d1774b075f9cf963a1fe2bf898" ON "user_likes_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8441847fd4907ef391650dd9dc" ON "user_likes_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE TABLE "user_dislikes_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a840bf019c54c98fe4482ece2b" ON "user_dislikes_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_52fee9f6040e7750879eed120e" ON "user_dislikes_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_d1774b075f9cf963a1fe2bf898"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8441847fd4907ef391650dd9dc"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_likes_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_d1774b075f9cf963a1fe2bf898d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_8441847fd4907ef391650dd9dce" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_likes_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_likes_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_likes_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_likes_movie"
                RENAME TO "user_likes_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d1774b075f9cf963a1fe2bf898" ON "user_likes_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8441847fd4907ef391650dd9dc" ON "user_likes_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a840bf019c54c98fe4482ece2b"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_52fee9f6040e7750879eed120e"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_dislikes_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_a840bf019c54c98fe4482ece2b4" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_52fee9f6040e7750879eed120e9" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_dislikes_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_dislikes_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_dislikes_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_dislikes_movie"
                RENAME TO "user_dislikes_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a840bf019c54c98fe4482ece2b" ON "user_dislikes_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_52fee9f6040e7750879eed120e" ON "user_dislikes_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_52fee9f6040e7750879eed120e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a840bf019c54c98fe4482ece2b"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_dislikes_movie"
                RENAME TO "temporary_user_dislikes_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_dislikes_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_dislikes_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_dislikes_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_dislikes_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_52fee9f6040e7750879eed120e" ON "user_dislikes_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a840bf019c54c98fe4482ece2b" ON "user_dislikes_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8441847fd4907ef391650dd9dc"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_d1774b075f9cf963a1fe2bf898"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_likes_movie"
                RENAME TO "temporary_user_likes_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_likes_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_likes_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_likes_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_likes_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8441847fd4907ef391650dd9dc" ON "user_likes_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d1774b075f9cf963a1fe2bf898" ON "user_likes_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_52fee9f6040e7750879eed120e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a840bf019c54c98fe4482ece2b"
        `);
        await queryRunner.query(`
            DROP TABLE "user_dislikes_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8441847fd4907ef391650dd9dc"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_d1774b075f9cf963a1fe2bf898"
        `);
        await queryRunner.query(`
            DROP TABLE "user_likes_movie"
        `);
    }
}
