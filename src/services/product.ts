import { eq, getTableColumns, ne, and } from "drizzle-orm";
import { db } from "@/db";
import {
  categoryTable,
  InsertProduct,
  productsTable,
  UpdateProduct,
} from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";

export const getProducts = async () => {
  try {
    const data = await db
      .select({
        ...getTableColumns(productsTable),
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
      })
      .from(productsTable)
      .orderBy(desc(productsTable.created_at))
      .leftJoin(categoryTable, eq(productsTable.category_id, categoryTable.id));

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getProductsIsactive = async () => {
  try {
    const data = await db
      .select({
        ...getTableColumns(productsTable),
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
      })
      .from(productsTable)
      .orderBy(desc(productsTable.created_at))
      .leftJoin(categoryTable, eq(productsTable.category_id, categoryTable.id));

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getProductsByCategoryId = async (id: string) => {
  try {
    const data = await db
      .select({
        ...getTableColumns(productsTable),
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
      })
      .from(productsTable)
      .where(eq(productsTable.category_id, id))
      .leftJoin(categoryTable, eq(productsTable.category_id, categoryTable.id));
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getProductsByCategoryIdIsActive = async (id: string) => {
  try {
    const data = await db
      .select({
        ...getTableColumns(productsTable),
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
      })
      .from(productsTable)
      .where(
        and(
          eq(productsTable.category_id, id),
          eq(productsTable.is_active, true)
        )
      )
      .leftJoin(categoryTable, eq(productsTable.category_id, categoryTable.id));
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getLastProductByCategoryId = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category_id, id))
      .orderBy(desc(productsTable.created_at))
      .limit(1)
      .execute();
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getOtherProductsByCategoryProductId = async (
  category_id: string,
  productId: string
) => {
  try {
    const data = await db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.category_id, category_id),
          ne(productsTable.product_id, productId)
        )
      );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch hproducts");
  }
};

export const getOtherProductsByCategoryProductIdIsActive = async (
  category_id: string,
  productId: string
) => {
  try {
    const data = await db
      .select({
        ...getTableColumns(productsTable),
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
      })
      .from(productsTable)
      .where(
        and(
          eq(productsTable.category_id, category_id),
          ne(productsTable.product_id, productId),
          eq(productsTable.is_active, true)
        )
      )
      .leftJoin(categoryTable, eq(productsTable.category_id, categoryTable.id));

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

export const getProductsByProductId = async (product_id: string) => {
  try {
    const data = await db
      .select({
        ...getTableColumns(productsTable),
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
      })
      .from(productsTable)
      .where(eq(productsTable.product_id, product_id))
      .leftJoin(categoryTable, eq(productsTable.category_id, categoryTable.id));
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
    map_image: data.map_image,
    others_image: data.others_image,
    address: data.address,
    province: data.province,
    district: data.district,
    sub_district: data.sub_district,
    postal_code: data.postal_code,
    tel: data.tel,
    phone: data.phone,
    remark: data.remark,
    product_id: data.product_id,
  });
};

export const editProduct = async (data: UpdateProduct) => {
  await db
    .update(productsTable)
    .set({
      id: data.id,
      category_id: data.category_id,
      name: data.name,
      description: data.description,
      price: data.price,
      main_image: data.main_image,
      map_image: data.map_image,
      others_image: data.others_image,
      address: data.address,
      province: data.province,
      district: data.district,
      sub_district: data.sub_district,
      postal_code: data.postal_code,
      tel: data.tel,
      phone: data.phone,
      remark: data.remark,
      product_id: data.product_id,
    })
    .where(eq(productsTable.id, data.id))
    .returning({ id: productsTable.id });
};

export const editIsActiveProduct = async ({
  id,
  is_active,
}: {
  id: string;
  is_active: boolean;
}) => {
  await db
    .update(productsTable)
    .set({
      is_active: is_active,
    })
    .where(eq(productsTable.id, id))
    .returning({ id: productsTable.id });
};

export const deleteProducts = async (id: string) => {
  await db.delete(productsTable).where(eq(productsTable.id, id));
};
