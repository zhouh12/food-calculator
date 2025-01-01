CREATE TABLE IF NOT EXISTS "users" (
	"Id" serial PRIMARY KEY NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Password" varchar(255) NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_Email_unique" UNIQUE("Email")
);
