CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '3b1f731e-6329-483e-b6a4-16ff1ea52023' NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_active" boolean DEFAULT true,
	"role" varchar NOT NULL,
	"term" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT 'd06395a1-7b7e-4eac-9ac4-3585c08c2674' NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" varchar NOT NULL,
	"file_size" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logos" (
	"id" uuid PRIMARY KEY DEFAULT '5afdd36e-3ccd-4d42-9e4b-5acc185d30a7' NOT NULL,
	"image_url" text NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_page_detail" (
	"id" uuid PRIMARY KEY DEFAULT 'a34d1824-35e0-4f18-aacd-c574e1d12164' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'ab1045a5-7578-4689-8ae3-06ce204d2ee5' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'bdfb58ad-bdbb-43e6-87ce-3dd7972fcf3d' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'cdc61619-109a-42f7-89d2-966d56e65d62' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'e7babf5b-f598-44a2-b448-43ae5d05ee13' NOT NULL,
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
CREATE TABLE IF NOT EXISTS "privacy_policy" (
	"id" uuid PRIMARY KEY DEFAULT '52dd3cd5-3c84-46e2-90d0-57ca4481f447' NOT NULL,
	"privacy_policy" varchar NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
