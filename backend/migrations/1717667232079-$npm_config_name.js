import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717667232079 {
    name = ' $npmConfigName1717667232079'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                CONSTRAINT "UQ_dee661497b02a227aa2d7520875" UNIQUE ("poster_path"),
                CONSTRAINT "UQ_70119690305e0363300f6c36cea" UNIQUE ("overview"),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title", "overview", "poster_path")
            SELECT "id",
                "title",
                "overview",
                "poster_path"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                CONSTRAINT "UQ_dee661497b02a227aa2d7520875" UNIQUE ("poster_path"),
                CONSTRAINT "UQ_70119690305e0363300f6c36cea" UNIQUE ("overview"),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title", "overview", "poster_path")
            SELECT "id",
                "title",
                "overview",
                "poster_path"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                CONSTRAINT "UQ_dee661497b02a227aa2d7520875" UNIQUE ("poster_path"),
                CONSTRAINT "UQ_70119690305e0363300f6c36cea" UNIQUE ("overview"),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title", "overview", "poster_path")
            SELECT "id",
                "title",
                "overview",
                "poster_path"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                CONSTRAINT "UQ_dee661497b02a227aa2d7520875" UNIQUE ("poster_path"),
                CONSTRAINT "UQ_70119690305e0363300f6c36cea" UNIQUE ("overview"),
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title", "overview", "poster_path")
            SELECT "id",
                "title",
                "overview",
                "poster_path"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
