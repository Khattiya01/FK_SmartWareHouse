import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const privacyAndPolicyTable = pgTable("privacy_policy", {
  id: uuid("id").default(uuidv4()).primaryKey(),
  privacy_policy: varchar("privacy_policy").notNull(),
  is_active: boolean("is_active").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type InsertprivacyAndPolicy = typeof privacyAndPolicyTable.$inferInsert;
export type SelectprivacyAndPolicy = typeof privacyAndPolicyTable.$inferSelect;
export type DeleteprivacyAndPolicy = {
  id: string;
};
export type UpdateprivacyAndPolicy = {
  id: string;
  privacy_policy?: string;
  is_active?: boolean;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
};

export const insertPrivacyAndPolicySchema = createInsertSchema(
  privacyAndPolicyTable,
  {
    privacy_policy: z
      .string()
      .min(1, { message: "privacy policy is required" }),
    is_active: z.boolean().optional(),
  }
);

export const updatePrivacyAndPolicySchema = createInsertSchema(
  privacyAndPolicyTable,
  {
    id: z.string().min(1, { message: "ID is required" }),
    privacy_policy: z
      .string()
      .min(1, { message: "privacy policy is required" }),
    is_active: z.boolean().optional(),
  }
);

export const updateIsActivePrivacyAndPolicySchema = createInsertSchema(
  privacyAndPolicyTable,
  {
    id: z.string().min(1, { message: "ID is required" }),
    privacy_policy: z.string().optional(),
    is_active: z.boolean(),
  }
);

export const deletePrivacyAndPolicySchema = createInsertSchema(
  privacyAndPolicyTable,
  {
    id: z.string().min(1, { message: "User ID is required" }),
    privacy_policy: z.string().optional(),
    is_active: z.boolean().optional(),
  }
);
