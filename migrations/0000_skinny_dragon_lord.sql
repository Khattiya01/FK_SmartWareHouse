CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '0160f017-a8e5-45da-8b66-d304ea6cff59' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '7484fb13-951b-4273-a5d1-01d2292492e7' NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" varchar NOT NULL,
	"file_size" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logos" (
	"id" uuid PRIMARY KEY DEFAULT 'c5b730d6-9ffe-4726-a055-9c01f75a6030' NOT NULL,
	"image_url" text NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_page_detail" (
	"id" uuid PRIMARY KEY DEFAULT 'ce50eb3b-718b-4ac5-a820-3a4f4a6b190a' NOT NULL,
	"banner_image_url" text NOT NULL,
	"banner_title" text NOT NULL,
	"banner_subtitle" text NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '7f26f04a-b566-4535-8c52-0d25af394289' NOT NULL,
	"product_id" varchar,
	"category_id" uuid NOT NULL,
	"typeProduct_id" uuid NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'a05346a5-a4dd-4ebb-9c04-5167bce4bb3c' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'f047b6e4-9611-45b9-9517-80454519dc5d' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'f294066f-4755-43ac-960a-22f61f48383f' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '802d8a56-ebc6-4857-b0bb-a46bd4a684dc' NOT NULL,
	"privacy_policy" varchar NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "type_product" (
	"id" uuid PRIMARY KEY DEFAULT '1c0794eb-3ebf-426d-88a5-56cbe4ff9128' NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "type_product_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_typeProduct_id_type_product_id_fk" FOREIGN KEY ("typeProduct_id") REFERENCES "public"."type_product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
