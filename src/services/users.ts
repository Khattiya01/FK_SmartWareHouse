import { eq } from "drizzle-orm";
import { db } from "@/db";
import { InsertUser, UpdateUser, usersTable } from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async () => {
  try {
    const data = await db.select().from(usersTable).where(eq(usersTable.is_active, true));
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
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

export const addUsers = async (data: InsertUser) => {
  await db.insert(usersTable).values({
    id: uuidv4(),
    username: data.username,
    password: data.password,
    role: data.role,
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

export const deleteUser = async (id: string) => {
  // await db.delete(usersTable).where(eq(usersTable.id, id));
  await db
  .update(usersTable)
  .set({
    is_active:false,
  })
  .where(eq(usersTable.id, id))
  .returning({ id: usersTable.id });
};
