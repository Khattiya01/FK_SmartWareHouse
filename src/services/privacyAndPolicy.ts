import { eq, desc, count } from "drizzle-orm";
import { db } from "@/db";
import {
  InsertprivacyAndPolicy,
  privacyAndPolicyTable,
  UpdateprivacyAndPolicy,
} from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";

export const getPrivacyAndPolicy = async ({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) => {
  const pageNumber = parseInt(page, 10) || 1;
  const size = parseInt(pageSize, 10) || 25;
  const offset = (pageNumber - 1) * size;

  try {
    const data = await db
      .select()
      .from(privacyAndPolicyTable)
      .orderBy(desc(privacyAndPolicyTable.created_at))
      .limit(size)
      .offset(offset);

    const total = await db
      .select({ count: count() })
      .from(privacyAndPolicyTable);
    return { data, total: total[0].count };
  } catch (error) {
    console.error("Error fetching privacy and policy:", error);
    throw new Error("Could not fetch users");
  }
};

export const getPrivacyAndPolicyById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(privacyAndPolicyTable)
      .where(eq(privacyAndPolicyTable.id, id));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching Privacy And Policy:", error);
  }
};

export const getPrivacyAndPolicyIsActive = async () => {
  try {
    const data = await db
      .select()
      .from(privacyAndPolicyTable)
      .where(eq(privacyAndPolicyTable.is_active, true));

    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching privacy and policy:", error);
    throw new Error("Could not fetch privacy and policy");
  }
};

export const addPrivacyAndPolicy = async (data: InsertprivacyAndPolicy) => {
  await db.insert(privacyAndPolicyTable).values({
    id: uuidv4(),
    privacy_policy: data.privacy_policy,
  });
};

export const editPrivacyAndPolicy = async (data: UpdateprivacyAndPolicy) => {
  await db
    .update(privacyAndPolicyTable)
    .set({
      id: data.id,
      privacy_policy: data.privacy_policy,
    })
    .where(eq(privacyAndPolicyTable.id, data.id))
    .returning({ id: privacyAndPolicyTable.id });
};

export const editIsActivePrivacyAndPolicy = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  await db
    .update(privacyAndPolicyTable)
    .set({
      is_active: is_active,
    })
    .where(eq(privacyAndPolicyTable.id, id))
    .returning({ id: privacyAndPolicyTable.id });
};

export const editPrivacyAndPolicyOtherIsActiveFalse = async (
  oldLogoActivedId: string
) => {
  await db
    .update(privacyAndPolicyTable)
    .set({ is_active: false })
    .where(eq(privacyAndPolicyTable.id, oldLogoActivedId));
};

export const deletePrivacyAndPolicy = async (id: string) => {
  await db
    .delete(privacyAndPolicyTable)
    .where(eq(privacyAndPolicyTable.id, id))
    .returning({ id: privacyAndPolicyTable.id });
};
