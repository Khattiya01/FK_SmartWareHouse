import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  categoryTable,
  InsertCategory,
  productsTable,
  SelectCategory,
  SelectCategoryIncludeProduct,
  SelectProduct,
  UpdateUser,
  usersTable,
} from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";
import { homePageDetailTable } from "@/db/schemas/homeDetail";

export const getCategory = async () => {
  try {
    // const categories = await db
    //   .select()
    //   .from(categoryTable)
    //   .orderBy(categoryTable.created_at);

    // const products = await db.select().from(productsTable);

    // const productsByCategory = products.reduce((acc: any, product: any) => {
    //   const categoryId = product.category_id;
    //   if (!acc[categoryId]) {
    //     acc[categoryId] = [];
    //   }
    //   acc[categoryId].push(product);
    //   return acc;
    // }, {});

    // const result = categories.map((category: any) => ({
    //   ...category,
    //   products: productsByCategory[category.id] || [],
    // }));

    // return result;

    const categories = await db
      .select()
      .from(categoryTable)
      .fullJoin(productsTable, eq(categoryTable.id, productsTable.category_id));

    const groupedCategoriesResult = categories.reduce(
      (
        acc: SelectCategoryIncludeProduct[],
        row: { category: SelectCategory | null; products: SelectProduct | null }
      ) => {
        const { category, products } = row;

        let existingCategory: any = acc.find((c) => c.id === category?.id);

        if (!existingCategory) {
          existingCategory = {
            ...category,
            products: [],
          };
          acc.push(existingCategory);
        }

        if (products?.id) {
          existingCategory?.products.push(products);
        }

        return acc;
      },
      []
    );

    return groupedCategoriesResult;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Could not fetch ctegory");
  }
};

export const getCategoryByName = async (name: string) => {
  try {
    const data = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.name, name));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Could not fetch category");
  }
};

export const addCategory = async (data: InsertCategory) => {
  await db.insert(categoryTable).values({
    id: uuidv4(),
    name: data.name,
    image_url: data.image_url,
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

export const deleteCategory = async (id: string) => {
  await db.delete(categoryTable).where(eq(categoryTable.id, id));
};
