import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class TestManyToMany31717698181506 {
    name = 'TestManyToMany31717698181506'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "popularity" float NOT NULL,
                CONSTRAINT "UQ_cbe780e143b9fa67b9dca84c992" UNIQUE ("poster_path")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_movies_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a839d5b9445827f71230aa45f7" ON "user_movies_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_59f1f1666c7ae778d3b835ef94" ON "user_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a839d5b9445827f71230aa45f7"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_59f1f1666c7ae778d3b835ef94"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_movies_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_a839d5b9445827f71230aa45f79" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_59f1f1666c7ae778d3b835ef94a" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_movies_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_movies_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_movies_movie"
                RENAME TO "user_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a839d5b9445827f71230aa45f7" ON "user_movies_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_59f1f1666c7ae778d3b835ef94" ON "user_movies_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_59f1f1666c7ae778d3b835ef94"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a839d5b9445827f71230aa45f7"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_movies_movie"
                RENAME TO "temporary_user_movies_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_movies_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_movies_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_movies_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_59f1f1666c7ae778d3b835ef94" ON "user_movies_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a839d5b9445827f71230aa45f7" ON "user_movies_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_59f1f1666c7ae778d3b835ef94"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_a839d5b9445827f71230aa45f7"
        `);
        await queryRunner.query(`
            DROP TABLE "user_movies_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
