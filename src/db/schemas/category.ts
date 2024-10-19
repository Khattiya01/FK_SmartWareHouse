import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { productsTable, SelectProduct } from "./products";

export const categoryTable = pgTable("category", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  image_url: text("image_url").notNull(),
  name: varchar("name").unique().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  products: many(productsTable),
}));

export type InsertCategory = typeof categoryTable.$inferInsert;
export type SelectCategory = typeof categoryTable.$inferSelect;
export interface SelectCategoryIncludeProduct extends SelectCategory {
  products: SelectProduct[];
}
export type DeleteCategory = {
  id: string;
};
export type Updatecategory = {
  id: string;
  image_url?: string;
  name?: string;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export const insertCategorySchema = createInsertSchema(categoryTable, {
  image_url: z.string().min(1, { message: "File URL is required" }),
  name: z.string().min(1, { message: "Category name is required" }),
});

export const updateCategorySchema = createInsertSchema(categoryTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  image_url: z.string().optional(),
  name: z.string().min(1, { message: "Category name is required" }),
});

export const deleteCategorySchema = createInsertSchema(categoryTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  image_url: z.string().optional(),
  name: z.string().optional(),
});
