import { desc, eq, count } from "drizzle-orm";
import { db } from "@/db";
import {
  InsertTypeProduct,
  productsTable,
  SelectProduct,
  SelectTypeProduct,
  SelectTypeProductIncludeProduct,
  typeProductTable,
  UpdateTypeProduct,
} from "@/db/schemas";
import { v4 as uuidv4 } from "uuid";

export const getTypeProduct = async ({
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
    const typeProducts = await db
      .select()
      .from(typeProductTable)
      .fullJoin(
        productsTable,
        eq(typeProductTable.id, productsTable.typeProduct_id)
      )
      .orderBy(desc(typeProductTable.created_at))
      .limit(size)
      .offset(offset);

    const groupedTypeProductResult = typeProducts.reduce(
      (
        acc: SelectTypeProductIncludeProduct[],
        row: {
          type_product: SelectTypeProduct | null;
          products: SelectProduct | null;
        }
      ) => {
        const { type_product, products } = row;

        let existingTypeProduct = acc.find((c) => c.id === type_product?.id);

        if (!existingTypeProduct) {
          if (type_product) {
            existingTypeProduct = {
              ...type_product,
              products: [],
            };
          }
          if (existingTypeProduct) {
            acc.push(existingTypeProduct);
          }
        }

        if (products?.id) {
          existingTypeProduct?.products.push(products);
        }

        return acc;
      },
      []
    );

    const total = await db.select({ count: count() }).from(typeProductTable);
    return { data: groupedTypeProductResult, total: total[0].count };
  } catch (error) {
    console.error("Error fetching type product:", error);
    throw new Error("Could not fetch type product");
  }
};

export const getTypeProductIsActive = async () => {
  try {
    const typeProducts = await db
      .select()
      .from(typeProductTable)
      .fullJoin(
        productsTable,
        eq(typeProductTable.id, productsTable.typeProduct_id)
      );

    const groupedTypeProductResult = typeProducts.reduce(
      (
        acc: SelectTypeProductIncludeProduct[],
        row: {
          type_product: SelectTypeProduct | null;
          products: SelectProduct | null;
        }
      ) => {
        const { type_product, products } = row;

        let existingTypeProduct = acc.find((c) => c.id === type_product?.id);

        if (!existingTypeProduct) {
          if (type_product) {
            existingTypeProduct = {
              ...type_product,
              products: [],
            };
          }
          if (existingTypeProduct) {
            acc.push(existingTypeProduct);
          }
        }

        if (products?.id && products?.is_active) {
          existingTypeProduct?.products.push(products);
        }

        return acc;
      },
      []
    );

    return groupedTypeProductResult;
  } catch (error) {
    console.error("Error fetching type product:", error);
    throw new Error("Could not fetch type product");
  }
};

export const getTypeProductByName = async (name: string) => {
  try {
    const data = await db
      .select()
      .from(typeProductTable)
      .where(eq(typeProductTable.name, name));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching type product:", error);
    throw new Error("Could not fetch type product");
  }
};

export const getTypeProductById = async (id: string) => {
  try {
    const data = await db
      .select()
      .from(typeProductTable)
      .where(eq(typeProductTable.id, id));
    return data && data?.length > 0 ? data[0] : undefined;
  } catch (error) {
    console.error("Error fetching type product:", error);
    throw new Error("Could not fetch type product");
  }
};

export const addTypeProduct = async (data: InsertTypeProduct) => {
  await db.insert(typeProductTable).values({
    id: uuidv4(),
    name: data.name,
  });
};

export const editTypeProduct = async (data: UpdateTypeProduct) => {
  await db
    .update(typeProductTable)
    .set({
      id: data.id,
      name: data.name,
    })
    .where(eq(typeProductTable.id, data.id))
    .returning({ id: typeProductTable.id });
};

export const deleteTypeProduct = async (id: string) => {
  await db.delete(typeProductTable).where(eq(typeProductTable.id, id));
};
