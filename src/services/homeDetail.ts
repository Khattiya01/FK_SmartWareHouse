import { eq } from "drizzle-orm";
import { db } from "@/db";
import { UpdateUser, usersTable } from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";
import {
  homePageDetailTable,
  InsertHomePageDetail,
} from "@/db/schemas/homeDetail";

export const getHomeDetail = async () => {
  try {
    const data = await db
      .select()
      .from(homePageDetailTable)
      .orderBy(homePageDetailTable.created_at);
    return data;
  } catch (error) {
    console.error("Error fetching home detail:", error);
    throw new Error("Could not fetch home detail");
  }
};

export const getHomeDetailIsActive = async () => {
  try {
    const data = await db
      .select()
      .from(homePageDetailTable)
      .where(eq(homePageDetailTable.is_active, true));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching logos:", error);
    throw new Error("Could not fetch logos");
  }
};

export const getUsersByUsername = async ({
  username,
}: {
  username: string;
}) => {
  try {
    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    return data;
  } catch (error) {
    console.error("Error fetching users by username:", error);
    throw new Error("Could not fetch users by username");
  }
};

export const addHomePageDetail = async (data: InsertHomePageDetail) => {
  await db.insert(homePageDetailTable).values({
    id: uuidv4(),
    banner_image_url: data.banner_image_url,
    content_01_title: data.content_01_title,
    content_01_detail: data.content_01_detail,
    content_02_image_url: data.content_02_image_url,
    content_02_detail: data.content_02_detail,
    contact_image_url: data.contact_image_url,
  });
};

export const editUser = async (data: UpdateUser) => {
  await db
    .update(usersTable)
    .set({
      username: data.username,
      role: data.role,
    })
    .where(eq(usersTable.id, data.id))
    .returning({ id: usersTable.id });
};

export const editHomePageDetailOtherIsActiveFalse = async (
  oldHomePageDetailActivedId: string
) => {
  await db
    .update(homePageDetailTable)
    .set({ is_active: false })
    .where(eq(homePageDetailTable.id, oldHomePageDetailActivedId));
};

export const editIsActiveHomePageDetail = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  await db
    .update(homePageDetailTable)
    .set({
      is_active: is_active,
    })
    .where(eq(homePageDetailTable.id, id))
    .returning({ id: homePageDetailTable.id });
};

export const deleteHomePageDetail = async (id: string) => {
  await db.delete(homePageDetailTable).where(eq(homePageDetailTable.id, id));
};
