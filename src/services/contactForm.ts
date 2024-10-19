import { db } from "@/db";
import {
  contactFormTable,
  InsertContactForm,
  UpdateContactForm,
} from "@/db/schemas";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const getContactForm = async () => {
  try {
    const data = await db.select().from(contactFormTable);
    return data;
  } catch (error) {
    console.error("Error fetching contact form:", error);
    throw new Error("Could not fetch contact form");
  }
};

export const addContactForm = async (data: InsertContactForm) => {
  await db.insert(contactFormTable).values({
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    title: data.phone,
    message: data.message
  });
};

export const editContactForm = async (data: UpdateContactForm) => {
  await db
    .update(contactFormTable)
    .set({
      name: data.name,
      email: data.email,
      phone: data.phone,
      title: data.phone,
    })
    .where(eq(contactFormTable.id, data.id))
    .returning({ id: contactFormTable.id });
};

export const deleteContactForm = async (id: string) => {
  await db.delete(contactFormTable).where(eq(contactFormTable.id, id));
};
