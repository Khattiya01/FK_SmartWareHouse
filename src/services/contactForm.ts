import { db } from "@/db";
import {
  contactFormTable,
  InsertContactForm,
  UpdateContactForm,
} from "@/db/schemas";
import { desc, eq, count, or, ilike, between, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const getContactForm = async ({
  page,
  pageSize,
  searchText,
  startDate,
  endDate,
}: {
  page: string;
  pageSize: string;
  searchText: string;
  startDate?: string;
  endDate?: string;
}) => {
  const pageNumber = parseInt(page, 10) || 1;
  const size = parseInt(pageSize, 10) || 25;
  const offset = (pageNumber - 1) * size;
  try {
    const query = db.select().from(contactFormTable);

    if (startDate && endDate) {
      if (searchText != "") {
        query.where(
          and(
            or(
              ilike(contactFormTable.name, `%${searchText}%`),
              ilike(contactFormTable.email, `%${searchText}%`)
            ),
            between(
              contactFormTable.created_at,
              new Date(startDate),
              new Date(endDate)
            )
          )
        );
      } else {
        query.where(
          between(
            contactFormTable.created_at,
            new Date(startDate),
            new Date(endDate)
          )
        );
      }
    }
    const data = await query
      .orderBy(desc(contactFormTable.created_at))
      .limit(size)
      .offset(offset);

    const totalQuery = db.select({ count: count() }).from(contactFormTable);

    if (startDate && endDate) {
      if (searchText != "") {
        totalQuery.where(
          and(
            or(
              ilike(contactFormTable.name, `%${searchText}%`),
              ilike(contactFormTable.email, `%${searchText}%`)
            ),
            between(
              contactFormTable.created_at,
              new Date(startDate),
              new Date(endDate)
            )
          )
        );
      } else {
        totalQuery.where(
          between(
            contactFormTable.created_at,
            new Date(startDate),
            new Date(endDate)
          )
        );
      }
    }

    const total = await totalQuery;

    return { data, total: total[0].count };
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
    lineId: data.lineId,
    title: data.title,
    message: data.message,
  });
};

export const editContactForm = async (data: UpdateContactForm) => {
  await db
    .update(contactFormTable)
    .set({
      name: data.name,
      email: data.email,
      phone: data.phone,
      lineId: data.lineId,
      title: data.phone,
    })
    .where(eq(contactFormTable.id, data.id))
    .returning({ id: contactFormTable.id });
};

export const deleteContactForm = async (id: string) => {
  await db.delete(contactFormTable).where(eq(contactFormTable.id, id));
};
