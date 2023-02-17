import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676638413781 implements MigrationInterface {
    name = 'init1676638413781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recommendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "perk" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "age" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "username" varchar NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer, "profileId" integer, CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"))`);
        await queryRunner.query(`CREATE TABLE "perks_users" ("perkId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("perkId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e913c61985014a64d2716d00cd" ON "perks_users" ("perkId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f05758bd819d618363e3332d07" ON "perks_users" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_recommendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_61298a446857ac96c88d0a09fd0" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_recommendation"("id", "createdAt", "updatedAt", "deletedAt", "description", "userId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "description", "userId" FROM "recommendation"`);
        await queryRunner.query(`DROP TABLE "recommendation"`);
        await queryRunner.query(`ALTER TABLE "temporary_recommendation" RENAME TO "recommendation"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "username" varchar NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer, "profileId" integer, CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "createdAt", "updatedAt", "deletedAt", "username", "password", "isActive", "phone", "dob", "daysActive", "profileId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "username", "password", "isActive", "phone", "dob", "daysActive", "profileId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`DROP INDEX "IDX_e913c61985014a64d2716d00cd"`);
        await queryRunner.query(`DROP INDEX "IDX_f05758bd819d618363e3332d07"`);
        await queryRunner.query(`CREATE TABLE "temporary_perks_users" ("perkId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_e913c61985014a64d2716d00cdb" FOREIGN KEY ("perkId") REFERENCES "perk" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f05758bd819d618363e3332d07d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("perkId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_perks_users"("perkId", "userId") SELECT "perkId", "userId" FROM "perks_users"`);
        await queryRunner.query(`DROP TABLE "perks_users"`);
        await queryRunner.query(`ALTER TABLE "temporary_perks_users" RENAME TO "perks_users"`);
        await queryRunner.query(`CREATE INDEX "IDX_e913c61985014a64d2716d00cd" ON "perks_users" ("perkId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f05758bd819d618363e3332d07" ON "perks_users" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_f05758bd819d618363e3332d07"`);
        await queryRunner.query(`DROP INDEX "IDX_e913c61985014a64d2716d00cd"`);
        await queryRunner.query(`ALTER TABLE "perks_users" RENAME TO "temporary_perks_users"`);
        await queryRunner.query(`CREATE TABLE "perks_users" ("perkId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("perkId", "userId"))`);
        await queryRunner.query(`INSERT INTO "perks_users"("perkId", "userId") SELECT "perkId", "userId" FROM "temporary_perks_users"`);
        await queryRunner.query(`DROP TABLE "temporary_perks_users"`);
        await queryRunner.query(`CREATE INDEX "IDX_f05758bd819d618363e3332d07" ON "perks_users" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e913c61985014a64d2716d00cd" ON "perks_users" ("perkId") `);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "username" varchar NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer, "profileId" integer, CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "createdAt", "updatedAt", "deletedAt", "username", "password", "isActive", "phone", "dob", "daysActive", "profileId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "username", "password", "isActive", "phone", "dob", "daysActive", "profileId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "recommendation" RENAME TO "temporary_recommendation"`);
        await queryRunner.query(`CREATE TABLE "recommendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "recommendation"("id", "createdAt", "updatedAt", "deletedAt", "description", "userId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "description", "userId" FROM "temporary_recommendation"`);
        await queryRunner.query(`DROP TABLE "temporary_recommendation"`);
        await queryRunner.query(`DROP INDEX "IDX_f05758bd819d618363e3332d07"`);
        await queryRunner.query(`DROP INDEX "IDX_e913c61985014a64d2716d00cd"`);
        await queryRunner.query(`DROP TABLE "perks_users"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "perk"`);
        await queryRunner.query(`DROP TABLE "recommendation"`);
    }

}
