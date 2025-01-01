CREATE TABLE IF NOT EXISTS "Profiles" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" integer NOT NULL,
	"Age" integer NOT NULL,
	"Weight" integer NOT NULL,
	"Goal" varchar(20) NOT NULL,
	"WorkoutsPerWeek" integer NOT NULL,
	"Gender" varchar(10) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "Users";--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "users_Email_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_UserId_Users_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_Email_unique" UNIQUE("Email");