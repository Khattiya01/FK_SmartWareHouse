import { eq, ne } from "drizzle-orm";
import { db } from "@/db";
import {
  InsertProduct,
  productsTable,
  UpdateUser,
  usersTable,
} from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";
import { homePageDetailTable } from "@/db/schemas/homeDetail";
import { redirect } from "next/navigation";

export const getProducts = async () => {
  try {
    const data = await db
      .select()
      .from(productsTable)
      .orderBy(productsTable.created_at);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getProductsByCategoryId = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category_id, id));
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getOtherProductsByCategoryId = async (
  id: string,
  productId: string
) => {
  try {
    const data = await db
      .select()
      .from(productsTable)
      .where(
        eq(productsTable.category_id, id) && ne(productsTable.id, productId)
      );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getProductsById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching products:", error);
    // throw new Error("Could not fetch products");
    redirect("/");
  }
};

export const addProducts = async (data: InsertProduct) => {
  await db.insert(productsTable).values({
    id: uuidv4(),
    category_id: data.category_id,
    name: data.name,
    description: data.description,
    price: data.price,
    main_image: data.main_image,
    sub_image_1: data.sub_image_1,
    map_image: data.map_image,
    others_image: data.others_image,
    address: data.address,
    province: data.province,
    district: data.district,
    sub_district: data.sub_district,
    postal_code: data.postal_code,
    tel: data.tel,
    phone: data.phone
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

export const deleteProducts = async (id: string) => {
  await db.delete(productsTable).where(eq(productsTable.id, id));
};
