import { db } from "@/db";
import { v4 as uuidv4 } from "uuid";
import { filesTable, InsertFile, UpdateFile } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const getFiles = async () => {
  try {
    const data = await db.select().from(filesTable);
    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Could not fetch files");
  }
};

export const getFilesByUrl = async (file_url: string) => {
  try {
    console.log("file_url", file_url);
    const data = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.file_url, file_url));
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Could not fetch files");
  }
};

export const getFilesByID = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.id, id));
    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Could not fetch files");
  }
};

export const addFiles = async (data: InsertFile) => {
  await db
    .insert(filesTable)
    .values({
      id: uuidv4(),
      file_name: data.file_name,
      file_type: data.file_type,
      file_size: data.file_size,
      file_url: data.file_url,
    })
    .returning();
};

export const editFiles = async (data: UpdateFile) => {
  await db
    .update(filesTable)
    .set({
      file_name: data.file_name,
      file_type: data.file_type,
      file_size: data.file_size,
      file_url: data.file_url,
    })
    .where(eq(filesTable.id, data.id))
    .returning({ id: filesTable.id });
};

export const deleteFiles = async (file_url: string) => {
  await db.delete(filesTable).where(eq(filesTable.file_url, file_url));
};
