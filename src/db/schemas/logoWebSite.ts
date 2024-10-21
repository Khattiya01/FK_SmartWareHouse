import { pgTable, timestamp, uuid, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const logosTable = pgTable("logos", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  image_url: text("image_url").notNull(),
  is_active: boolean("is_active").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type Insertlogo = typeof logosTable.$inferInsert;
export type Selectlogo = typeof logosTable.$inferSelect;
export type Deletelogo = {
  id: string;
};
export type Updatelogo = {
  id: string;
  image_url: string;
  is_active?: boolean;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export type UpdateIsActivelogo = {
  id: string;
  is_active?: boolean;
};

export const insertlogoSchema = createInsertSchema(logosTable, {
  image_url: z.string().min(1, { message: "File ID is required" }),
  is_active: z.boolean().optional(),
});

export const updatelogoSchema = createInsertSchema(logosTable, {
  id: z.string().min(1, { message: "File ID is required" }),
  image_url: z.string().min(1, { message: "File ID is required" }),
  is_active: z.boolean().optional(),
});

export const updateIsActivelogoSchema = createInsertSchema(logosTable, {
  id: z.string().min(1, { message: "File ID is required" }),
  image_url: z.string().optional(),
  is_active: z.boolean(),
});

export const deletelogoSchema = createInsertSchema(logosTable, {
  id: z.string().min(1, { message: "File ID is required" }),
  image_url: z.string().optional(),
  is_active: z.boolean().optional(),
});
