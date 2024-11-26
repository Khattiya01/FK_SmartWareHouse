import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { productsTable, SelectProduct } from "./products";

export const typeProductTable = pgTable("type_product", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  name: varchar("name").unique().notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const TypeProductRelations = relations(typeProductTable, ({ many }) => ({
  products: many(productsTable),
}));

export type InsertTypeProduct = typeof typeProductTable.$inferInsert;
export type SelectTypeProduct = typeof typeProductTable.$inferSelect;
export interface SelectTypeProductIncludeProduct extends SelectTypeProduct {
  products: SelectProduct[];
}
export type DeleteTypeProduct = {
  id: string;
};
export type UpdateTypeProduct = {
  id: string;
  name?: string;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export const insertTypeProductSchema = createInsertSchema(typeProductTable, {
  name: z.string().min(1, { message: "TypeProduct name is required" }),
});

export const updateTypeProductSchema = createInsertSchema(typeProductTable, {
  id: z.string().min(1, { message: "TypeProduct ID is required" }),
  name: z.string().min(1, { message: "TypeProduct name is required" }),
});

export const deleteTypeProductSchema = createInsertSchema(typeProductTable, {
  id: z.string().min(1, { message: "TypeProduct ID is required" }),
  name: z.string().optional(),
});
