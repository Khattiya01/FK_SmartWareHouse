CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT 'f7f70949-e0b8-4672-b083-84e2300434a8' NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_active" boolean DEFAULT true,
	"role" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT 'af075610-87c7-41e7-9fff-7ed2cb8b39d1' NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" varchar NOT NULL,
	"file_size" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logos" (
	"id" uuid PRIMARY KEY DEFAULT 'be99d2db-5fa6-4bdb-abb2-ffa77aec4e7d' NOT NULL,
	"image_url" text NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_page_detail" (
	"id" uuid PRIMARY KEY DEFAULT '763f21d0-498d-4e34-b500-f7b3e598f93f' NOT NULL,
	"banner_image_url" text NOT NULL,
	"content_01_title" text NOT NULL,
	"content_01_detail" text NOT NULL,
	"content_02_image_url" text NOT NULL,
	"content_02_detail" text NOT NULL,
	"contact_image_url" text NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT '83cd4ade-f310-41c6-bb89-f963ab2c0e5b' NOT NULL,
	"product_id" varchar,
	"category_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"price" numeric(10, 2),
	"main_image" text,
	"map_image" text,
	"others_image" text,
	"address" varchar,
	"province" varchar,
	"district" varchar,
	"sub_district" varchar,
	"postal_code" varchar,
	"tel" varchar,
	"phone" varchar,
	"remark" varchar,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT '49bd26ed-1703-48c5-803b-61aa54976700' NOT NULL,
	"image_url" text NOT NULL,
	"name" varchar NOT NULL,
	"abbreviation" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "category_name_unique" UNIQUE("name"),
	CONSTRAINT "category_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact" (
	"id" uuid PRIMARY KEY DEFAULT '68d8708f-7b3f-4cd8-a015-e9b1415bd374' NOT NULL,
	"address" varchar,
	"province" varchar,
	"district" varchar,
	"sub_district" varchar,
	"postal_code" varchar,
	"tel" varchar,
	"phone" varchar,
	"map_image" text,
	"bg_image" text,
	"line_id" varchar,
	"line_url" varchar,
	"facebook_url" varchar,
	"tiktok_url" varchar,
	"start_day_bs_hour" varchar,
	"end_day_bs_hour" varchar,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_form" (
	"id" uuid PRIMARY KEY DEFAULT '7f3cd2bd-8049-4006-ab63-c4fc64c0afaa' NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"lineId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
