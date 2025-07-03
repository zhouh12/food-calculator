ALTER TABLE "Profiles" ADD COLUMN "Height" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Profiles" ADD COLUMN "ActivityLevel" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "Profiles" DROP COLUMN IF EXISTS "WorkoutsPerWeek";