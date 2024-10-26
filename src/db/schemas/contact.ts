import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const contactTable = pgTable("contact", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  address: varchar("address"),
  province: varchar("province"),
  district: varchar("district"),
  sub_district: varchar("sub_district"),
  postal_code: varchar("postal_code"),
  tel: varchar("tel"),
  phone: varchar("phone"),
  map_image: text("map_image"),
  bg_image: text("bg_image"),
  line_id: varchar("line_id"),
  line_url: varchar("line_url"),
  facebook_url: varchar("facebook_url"),
  tiktok_url: varchar("tiktok_url"),
  start_day_bs_hour: varchar("start_day_bs_hour"),
  end_day_bs_hour: varchar("end_day_bs_hour"),
  is_active: boolean("is_active").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type InsertContact = typeof contactTable.$inferInsert;
export type SelectContact = typeof contactTable.$inferSelect;
export type DeleteContact = {
  id: string;
};
export type UpdateContact = {
  id: string;
  address?: string;
  province?: string;
  district?: string;
  sub_district?: string;
  postal_code?: string;
  tel?: string;
  phone?: string;
  map_image?: string;
  bg_image?: string;
  line_id?: string;
  line_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  start_day_bs_hour?: string;
  end_day_bs_hour?: string;
  is_active?: boolean;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export const insertContactSchema = createInsertSchema(contactTable, {
  address: z.string().min(1, { message: "Address is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sub_district: z.string().min(1, { message: "Sub district is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  tel: z.string().min(1, { message: "Tel is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  map_image: z.string().min(1, { message: "Map image is required" }),
  bg_image: z.string().min(1, { message: "Background image is required" }),
  line_id: z.string().min(1, { message: "Line id is required" }),
  line_url: z.string().min(1, { message: "Line URL is required" }),
  facebook_url: z.string().min(1, { message: "Facebook url is required" }),
  tiktok_url: z.string().min(1, { message: "Tiktok url is required" }),
  start_day_bs_hour: z.string().min(1, { message: "Start day bs hour url is required" }),
  end_day_bs_hour: z.string().min(1, { message: "End day bs hour url is required" }),
  is_active: z.boolean().optional(),
});

export const updateContactSchema = createInsertSchema(contactTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sub_district: z.string().min(1, { message: "Sub district is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  tel: z.string().min(1, { message: "Tel is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  map_image: z.string().min(1, { message: "Map image is required" }),
  bg_image: z.string().min(1, { message: "Background image is required" }),
  line_id: z.string().min(1, { message: "Line id is required" }),
  line_url: z.string().min(1, { message: "Line URL is required" }),
  facebook_url: z.string().min(1, { message: "Facebook url is required" }),
  tiktok_url: z.string().min(1, { message: "Tiktok url is required" }),
  start_day_bs_hour: z.string().min(1, { message: "Start day bs hour url is required" }),
  end_day_bs_hour: z.string().min(1, { message: "End day bs hour url is required" }),
  is_active: z.boolean().optional(),
});

export const updateIsActiveContactSchema = createInsertSchema(contactTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  address: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  sub_district: z.string().optional(),
  postal_code: z.string().optional(),
  tel: z.string().optional(),
  phone: z.string().optional(),
  map_image: z.string().optional(),
  bg_image: z.string().optional(),
  line_id: z.string().optional(),
  line_url: z.string().optional(),
  facebook_url: z.string().optional(),
  tiktok_url: z.string().optional(),
  start_day_bs_hour: z.string().optional(),
  end_day_bs_hour: z.string().optional(),
  is_active: z.boolean(),
});

export const deleteContactSchema = createInsertSchema(contactTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  address: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  sub_district: z.string().optional(),
  postal_code: z.string().optional(),
  tel: z.string().optional(),
  phone: z.string().optional(),
  map_image: z.string().optional(),
  bg_image: z.string().optional(),
  line_id: z.string().optional(),
  line_url: z.string().optional(),
  facebook_url: z.string().optional(),
  tiktok_url: z.string().optional(),
  start_day_bs_hour: z.string().optional(),
  end_day_bs_hour: z.string().optional(),
  is_active: z.boolean().optional(),
});
