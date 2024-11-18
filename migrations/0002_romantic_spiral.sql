ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '84e0dc99-a350-488d-81b9-77269188e891';--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "id" SET DEFAULT 'c5f8041f-d5cb-4158-b485-499393003859';--> statement-breakpoint
ALTER TABLE "logos" ALTER COLUMN "id" SET DEFAULT '89a64b7f-62f2-46c7-9f40-99d5372a88d3';--> statement-breakpoint
ALTER TABLE "home_page_detail" ALTER COLUMN "id" SET DEFAULT '8bacb52b-ead6-4c57-9a28-6412b3470c50';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT '940b6619-0ed8-41f7-8a7c-e99056ebf69f';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT 'eba5497c-123d-4a5d-a099-5e6d8fed863a';--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "id" SET DEFAULT '9beb9460-1cc2-4eb9-ab1b-01727200efbe';--> statement-breakpoint
ALTER TABLE "contact_form" ALTER COLUMN "id" SET DEFAULT '9ee7d7c2-6e00-4e4e-a672-29ad2bc842c8';--> statement-breakpoint
ALTER TABLE "privacy_policy" ALTER COLUMN "id" SET DEFAULT 'c4f266ee-9b78-4235-9d2a-704559aeb60c';--> statement-breakpoint
ALTER TABLE "home_page_detail" ADD COLUMN "banner_subtitle" text NOT NULL;