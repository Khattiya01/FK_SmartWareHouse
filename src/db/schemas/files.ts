import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  decimal,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const filesTable = pgTable("files", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  file_url: text("file_url").notNull(),
  file_name: text("file_name").notNull(),
  file_type: varchar("file_type").notNull(),
  file_size: decimal("file_size").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

// Infer types
export type InsertFile = typeof filesTable.$inferInsert;
export type SelectFile = typeof filesTable.$inferSelect;
export type DeleteFile = {
  id: string;
};
export type UpdateFile = {
  id: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  file_size?: string;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

// Create Zod schemas
export const insertFileSchema = createInsertSchema(filesTable, {
  file_url: z.string().min(1, { message: "File URL must be a valid URL" }),
  file_name: z.string().min(1, { message: "File name is required" }),
  file_type: z.string().min(1, { message: "File name is required" }),
  file_size: z.number(),
});

export const updateFileSchema = createInsertSchema(filesTable, {
  id: z.string().optional(),
  file_url:  z.string().min(1, { message: "File URL must be a valid URL" }),
  file_name: z.string().min(1, { message: "File name is required" }),
  file_type: z.string().min(1, { message: "File name is required" }),
  file_size: z
    .number()
    .positive({ message: "File size must be a positive number" }),
});

export const deleteFileSchema = createInsertSchema(filesTable, {
  id: z.string().optional(),
  file_url: z.string().min(1, { message: "File URL must be a valid URL" }),
  file_name: z.string().optional(),
  file_type: z.string().optional(),
  file_size: z.number().optional(),
});
