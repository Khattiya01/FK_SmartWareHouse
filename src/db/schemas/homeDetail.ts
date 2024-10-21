import { pgTable, timestamp, uuid, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const homePageDetailTable = pgTable("home_page_detail", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  banner_image_url: text("banner_image_url").notNull(),
  content_01_title: text("content_01_title").notNull(),
  content_01_detail: text("content_01_detail").notNull(),
  content_02_image_url: text("content_02_image_url").notNull(),
  content_02_detail: text("content_02_detail").notNull(),
  contact_image_url: text("contact_image_url").notNull(),
  is_active: boolean("is_active").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type InsertHomePageDetail = typeof homePageDetailTable.$inferInsert;

export type SelectHomePageDetail = typeof homePageDetailTable.$inferSelect;

export type DeleteHomePageDetail = {
  id: string;
};

export type UpdateHomePageDetail = {
  id: string;
  banner_image_url?: string;
  content_01_title?: string;
  content_01_detail?: string;
  content_02_image_url?: string;
  content_02_detail?: string;
  contact_image_url?: string;
  is_active?: boolean;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export const insertHomePageDetailSchema = createInsertSchema(
  homePageDetailTable,
  {
    banner_image_url: z
      .string()
      .min(1, { message: "Banne image url is required" }),
    content_01_title: z
      .string()
      .min(1, { message: "Content title is required" }),
    content_01_detail: z
      .string()
      .min(1, { message: "Content detail is required" }),
    content_02_image_url: z
      .string()
      .min(1, { message: "Content 2 image url is required" }),
    content_02_detail: z
      .string()
      .min(1, { message: "Content 2 detail is required" }),
    contact_image_url: z
      .string()
      .min(1, { message: "Content 2 image url is required" }),
    is_active: z.boolean().optional(),
  }
);

export const updateHomePageDetailSchema = createInsertSchema(
  homePageDetailTable,
  {
    id: z.string().min(1, { message: "ID is required" }),
    banner_image_url: z.string().optional(),
    content_01_title: z.string().optional(),
    content_01_detail: z.string().optional(),
    content_02_image_url: z.string().optional(),
    content_02_detail: z.string().optional(),
    contact_image_url: z.string().optional(),
    is_active: z.boolean().optional(),
  }
);

export const updateIsActiveHomePageDetailSchema = createInsertSchema(
  homePageDetailTable,
  {
    id: z.string().min(1, { message: "ID is required" }),
    banner_image_url: z.string().optional(),
    content_01_title: z.string().optional(),
    content_01_detail: z.string().optional(),
    content_02_image_url: z.string().optional(),
    content_02_detail: z.string().optional(),
    contact_image_url: z.string().optional(),
    is_active: z.boolean(),
  }
);

export const deleteHomePageDetailSchema = createInsertSchema(
  homePageDetailTable,
  {
    id: z.string().min(1, { message: "is required" }),
    content_01_title: z.string().optional(),
    content_01_detail: z.string().optional(),
    content_02_image_url: z.string().optional(),
    content_02_detail: z.string().optional(),
    contact_image_url: z.string().optional(),
    is_active: z.boolean().optional(),
  }
);
