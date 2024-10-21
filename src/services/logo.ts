import { eq } from "drizzle-orm";
import { db } from "@/db";
import { v4 as uuidv4 } from "uuid";
import { Insertlogo, logosTable, Updatelogo } from "@/db/schemas";

export const getLogos = async () => {
  try {
    const data = await db
      .select()
      .from(logosTable)
      .orderBy(logosTable.created_at);
    return data;
  } catch (error) {
    console.error("Error fetching logos:", error);
    throw new Error("Could not fetch logos");
  }
};

export const getLogosIsActived = async () => {
  try {
    const data = await db
      .select()
      .from(logosTable)
      .where(eq(logosTable.is_active, true));
    return data;
  } catch (error) {
    console.error("Error fetching logos:", error);
    throw new Error("Could not fetch logos");
  }
};

export const getLogoById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(logosTable)
      .where(eq(logosTable.id, id));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching logos:", error);
    throw new Error("Could not fetch logos");
  }
};

export const addLogos = async (data: Insertlogo) => {
  await db.insert(logosTable).values({
    id: uuidv4(),
    image_url: data.image_url,
    is_active: false,
  });
};

export const editLogos = async (data: Updatelogo) => {
  await db
    .update(logosTable)
    .set({
      image_url: data.image_url,
    })
    .where(eq(logosTable.id, data.id))
    .returning({ id: logosTable.id });
};

export const editLogosOtherIsActiveFalse = async (oldLogoActivedId: string) => {
  await db
    .update(logosTable)
    .set({ is_active: false })
    .where(eq(logosTable.id, oldLogoActivedId));
};

export const editIsActiveLogos = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  await db
    .update(logosTable)
    .set({
      is_active: is_active,
    })
    .where(eq(logosTable.id, id))
    .returning({ id: logosTable.id });
};

export const deleteLogos = async (id: string) => {
  await db.delete(logosTable).where(eq(logosTable.id, id));
};
