import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const contactFormTable = pgTable("contact_form", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  lineId: varchar("lineId").notNull(),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type InsertContactForm = typeof contactFormTable.$inferInsert;
export type SelectContactForm = typeof contactFormTable.$inferSelect;
export type DeleteContactForm = {
  id: string;
};
export type UpdateContactForm = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  title?: string;
  lineId?: string;
  message?: string;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export const insertContactFormSchema = createInsertSchema(contactFormTable, {
  name: z.string().min(1, { message: "จำเป็นต้องระบุชื่อ" }),
  email: z.string().email().min(1, { message: "จำเป็นต้องระบุอีเมล" }),
  phone: z.string().min(1, { message: "จำเป็นต้องระบุหมายเลขโทรศัพท์" }),
  title: z.string().min(1, { message: "จำเป็นต้องระบุชื่อเรื่อง" }),
  lineId: z.string().min(1, { message: "จำเป็นต้อง Line Id" }),
  message: z.string().min(1, { message: "จำเป็นต้องระบุข้อความ" }),
});

export const updateContactFormSchema = createInsertSchema(contactFormTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  name: z.string().min(1, { message: "name is required" }),
  email: z.string().min(1, { message: "email is required" }),
  phone: z.string().min(1, { message: "phone is required" }),
  lineId: z.string().min(1, { message: "จำเป็นต้อง Line ID" }),
  title: z.string().min(1, { message: "title is required" }),
  message: z.string().min(1, { message: "message is required" }),
});

export const deleteContactFormSchema = createInsertSchema(contactFormTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  lineId: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
});
