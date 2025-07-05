CREATE TABLE IF NOT EXISTS "DailyTargets" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" integer NOT NULL,
	"Date" timestamp NOT NULL,
	"TargetCalories" numeric(8, 2) NOT NULL,
	"ConsumedCalories" numeric(8, 2) DEFAULT '0',
	"RecommendedExerciseMinutes" integer,
	"ActualExerciseMinutes" integer DEFAULT 0,
	"CreatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ExerciseRecommendations" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" integer NOT NULL,
	"ExerciseType" varchar(100) NOT NULL,
	"Duration" integer NOT NULL,
	"CaloriesBurned" numeric(8, 2),
	"Date" timestamp NOT NULL,
	"CreatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Meals" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" integer NOT NULL,
	"ImageUrl" varchar(500),
	"FoodName" varchar(255) NOT NULL,
	"EstimatedCalories" numeric(8, 2) NOT NULL,
	"Confidence" numeric(3, 2),
	"NutritionData" jsonb,
	"MealType" varchar(50),
	"CreatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DailyTargets" ADD CONSTRAINT "DailyTargets_UserId_Users_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ExerciseRecommendations" ADD CONSTRAINT "ExerciseRecommendations_UserId_Users_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Meals" ADD CONSTRAINT "Meals_UserId_Users_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
