import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { contactTable, InsertContact, UpdateContact } from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";

export const getContact = async () => {
  try {
    const data = await db
      .select()
      .from(contactTable)
      .orderBy(desc(contactTable.created_at));
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw new Error("Could not fetch contact");
  }
};

export const getContactIsActive = async () => {
  try {
    const data = await db
      .select()
      .from(contactTable)
      .where(eq(contactTable.is_active, true));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw new Error("Could not fetch contact");
  }
};

export const getContactById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(contactTable)
      .where(eq(contactTable.id, id));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching contact:", error);
    // throw new Error("Could not fetch products");
  }
};

export const addContact = async (data: InsertContact) => {
  await db.insert(contactTable).values({
    id: uuidv4(),
    address: data.address,
    province: data.province,
    district: data.district,
    sub_district: data.sub_district,
    postal_code: data.postal_code,
    tel: data.tel,
    phone: data.phone,
    map_image: data.map_image,
    bg_image: data.bg_image,
    line_id: data.line_id,
    line_url: data.line_url,
    facebook_url: data.facebook_url,
    tiktok_url: data.tiktok_url,
    start_day_bs_hour: data.start_day_bs_hour,
    end_day_bs_hour: data.end_day_bs_hour,
  });
};

export const editContact = async (data: UpdateContact) => {
  await db
    .update(contactTable)
    .set({
      address: data.address,
      province: data.province,
      district: data.district,
      sub_district: data.sub_district,
      postal_code: data.postal_code,
      tel: data.tel,
      phone: data.phone,
      map_image: data.map_image,
      bg_image: data.bg_image,
      line_id: data.line_id,
      facebook_url: data.facebook_url,
      line_url: data.line_url,
      tiktok_url: data.tiktok_url,
      start_day_bs_hour: data.start_day_bs_hour,
      end_day_bs_hour: data.end_day_bs_hour,
      is_active: data.is_active,
    })
    .where(eq(contactTable.id, data.id))
    .returning({ id: contactTable.id });
};

export const editContactOtherIsActiveFalse = async (
  oldContactActivedId: string
) => {
  await db
    .update(contactTable)
    .set({ is_active: false })
    .where(eq(contactTable.id, oldContactActivedId));
};

export const editIsActiveContact = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  await db
    .update(contactTable)
    .set({
      is_active: is_active,
    })
    .where(eq(contactTable.id, id))
    .returning({ id: contactTable.id });
};

export const deleteContact = async (id: string) => {
  await db.delete(contactTable).where(eq(contactTable.id, id));
};
