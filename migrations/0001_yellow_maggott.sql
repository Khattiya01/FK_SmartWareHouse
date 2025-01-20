ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '55245f6b-7595-4f00-ab52-cb5f1f956577';--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "id" SET DEFAULT '5f5d0a68-3344-47a7-9a1e-17d099786c74';--> statement-breakpoint
ALTER TABLE "logos" ALTER COLUMN "id" SET DEFAULT '7d8a3915-5813-4a1e-805c-23a41bc7f31d';--> statement-breakpoint
ALTER TABLE "home_page_detail" ALTER COLUMN "id" SET DEFAULT 'b364c8e5-4c5d-4f9c-96d0-ea67d161d780';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT '9c8aaa75-4212-4ac6-aabe-6958fe775368';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE numeric(12, 2);--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT 'bccb8720-66b8-4f7a-8c2a-839ed83b3b86';--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "id" SET DEFAULT 'bf29ddb3-4093-4056-9f7f-cbeec45de8bc';--> statement-breakpoint
ALTER TABLE "contact_form" ALTER COLUMN "id" SET DEFAULT '3952139f-bb64-4287-bca3-86f4cd0bb1b0';--> statement-breakpoint
ALTER TABLE "privacy_policy" ALTER COLUMN "id" SET DEFAULT 'f8a50fb0-6a9f-4c4e-81bb-159fb2226cab';--> statement-breakpoint
ALTER TABLE "type_product" ALTER COLUMN "id" SET DEFAULT '069d9ff6-9f47-4231-bce6-8ddcfec81b9e';