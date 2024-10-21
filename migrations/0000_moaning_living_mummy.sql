CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '11d871f1-0a34-4a69-82ee-73f152911d3f' NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_active" boolean DEFAULT true,
	"role" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" uuid PRIMARY KEY DEFAULT '6e35e276-0a64-4918-82aa-f381541c9ca1' NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" varchar NOT NULL,
	"file_size" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logos" (
	"id" uuid PRIMARY KEY DEFAULT '3c033b87-48e0-458f-9732-8f5ade86b7c0' NOT NULL,
	"image_url" text,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "home_page_detail" (
	"id" uuid PRIMARY KEY DEFAULT '5c317f16-4a65-4272-ad78-8ac154b2d484' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '19ea0d81-c60a-41bc-8d53-06b94d4dec60' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '8b5af338-f455-404d-9df0-301995f259a7' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT 'e55daa1c-8003-412b-8086-a86b8549669d' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT '03ea4056-7b1c-4a51-bd53-849c6aa01b12' NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
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
