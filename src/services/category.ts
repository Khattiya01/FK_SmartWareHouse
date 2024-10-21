import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  categoryTable,
  InsertCategory,
  productsTable,
  SelectCategory,
  SelectCategoryIncludeProduct,
  SelectProduct,
  Updatecategory,
} from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";
import { homePageDetailTable } from "@/db/schemas/homeDetail";

export const getCategory = async () => {
  try {
    const categories = await db
      .select()
      .from(categoryTable)
      .fullJoin(productsTable, eq(categoryTable.id, productsTable.category_id))
      .orderBy(desc(categoryTable.created_at));

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

export const getCategoryIsActive = async () => {
  try {
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

        if (products?.id && products?.is_active) {
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

export const getCategoryById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.id, id));
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
    abbreviation: data.abbreviation,
  });
};

export const editCategory = async (data: Updatecategory) => {
  await db
    .update(categoryTable)
    .set({
      id: data.id,
      name: data.name,
      image_url: data.image_url,
      abbreviation: data.abbreviation,
    })
    .where(eq(categoryTable.id, data.id))
    .returning({ id: categoryTable.id });
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
