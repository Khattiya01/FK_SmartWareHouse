import {
  pgTable,
  timestamp,
  uuid,
  text,
  varchar,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { categoryTable } from "./category";
import { relations } from "drizzle-orm";
import { typeProductTable } from "./typeProduct";

export const productsTable = pgTable("products", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  product_id: varchar("product_id"),
  category_id: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "cascade" }),
  typeProduct_id: uuid("typeProduct_id")
    .notNull()
    .references(() => typeProductTable.id),
  name: varchar("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }),
  main_image: text("main_image"),
  map_image: text("map_image"),
  others_image: text("others_image"),
  address: varchar("address"),
  province: varchar("province"),
  district: varchar("district"),
  sub_district: varchar("sub_district"),
  postal_code: varchar("postal_code"),
  tel: varchar("tel"),
  phone: varchar("phone"),
  remark: varchar("remark"),
  is_active: boolean("is_active").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const productRelations = relations(productsTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [productsTable.category_id],
    references: [categoryTable.id],
  }),
  typeProduct: one(typeProductTable, {
    fields: [productsTable.typeProduct_id],
    references: [typeProductTable.id],
  }),
}));

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;
export interface SelectProductIncludeCategory extends SelectProduct {
  category: {
    id: string;
    name: string;
  } | null;
}
export type DeleteProduct = {
  id: string;
};
export type UpdateProduct = {
  id: string;
  product_id?: string;
  category_id?: string;
  typeProduct_id?: string;
  name?: string;
  description?: string;
  price?: string;
  main_image?: string;
  map_image?: string;
  others_image?: string;
  address?: string;
  province?: string;
  district?: string;
  sub_district?: string;
  postal_code?: string;
  tel?: string;
  phone?: string;
  remark?: string;
  is_active?: boolean;
};

export const insertProductSchema = createInsertSchema(productsTable, {
  category_id: z.string().min(1, { message: "Category ID is required" }),
  typeProduct_id: z.string().min(1, { message: "Type Product ID is required" }),
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().min(1, { message: "price is required" }),
  main_image: z.string().min(1, { message: "Main Image is required" }),
  map_image: z.string().min(1, { message: "Map Image is required" }),
  others_image: z.string().min(1, { message: "Others Image is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sub_district: z.string().min(1, { message: "Sub district is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  tel: z.string().optional(),
  phone: z.string().optional(),
  remark: z.string().optional(),
  product_id: z.string().optional(),
  is_active: z.boolean().optional(),
});

export const updateProductSchema = createInsertSchema(productsTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  category_id: z.string().min(1, { message: "Category ID is required" }),
  typeProduct_id: z.string().min(1, { message: "Type Product ID is required" }),
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().min(1, { message: "price is required" }),
  main_image: z.string().min(1, { message: "Main Image is required" }),
  map_image: z.string().min(1, { message: "Map Image is required" }),
  others_image: z.string().min(1, { message: "Others Image is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sub_district: z.string().min(1, { message: "Sub district is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  tel: z.string().optional(),
  phone: z.string().optional(),
  remark: z.string().optional(),
  product_id: z.string().optional(),
  is_active: z.boolean().optional(),
});

export const updatIsActiveProductSchema = createInsertSchema(productsTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  category_id: z.string().optional(),
  typeProduct_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  main_image: z.string().optional(),
  map_image: z.string().optional(),
  others_image: z.string().optional(),
  address: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  sub_district: z.string().optional(),
  postal_code: z.string().optional(),
  tel: z.string().optional(),
  phone: z.string().optional(),
  remark: z.string().optional(),
  product_id: z.string().optional(),
  is_active: z.boolean(),
});

export const deleteProductSchema = createInsertSchema(productsTable, {
  id: z.string().min(1, { message: "Category ID is required" }),
  category_id: z.string().optional(),
  typeProduct_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  main_image: z.string().optional(),
  map_image: z.string().optional(),
  others_image: z.string().optional(),
  address: z.string().optional(),
  district: z.string().optional(),
  sub_district: z.string().optional(),
  postal_code: z.string().optional(),
  tel: z.string().optional(),
  phone: z.string().optional(),
  remark: z.string().optional(),
  product_id: z.string().optional(),
  is_active: z.boolean().optional(),
});
