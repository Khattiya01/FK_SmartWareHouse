CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '9ce9f6b9-2267-454a-b7a6-f8884e76f1db' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'b08225ca-3e69-45f9-8932-ccd8e9b1d33b' NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" varchar NOT NULL,
	"file_size" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logos" (
	"id" uuid PRIMARY KEY DEFAULT '83a2c7ea-3472-4880-8eeb-4eb780553afe' NOT NULL,
	"image_url" text NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_page_detail" (
	"id" uuid PRIMARY KEY DEFAULT '5f7023de-6e8a-4462-8a4e-68a379f471ed' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'bccd3a80-2fe5-4251-be91-681daec1e875' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '60ae22b0-c8bc-4aab-a2e9-50ac24d63f39' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'd6967322-ed6f-40b9-89a6-7d037c281973' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'a8667198-aab9-4d72-928d-5434222cd071' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'f6a9cc3d-8ae8-4842-bb62-bc4b3b4740a1' NOT NULL,
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
