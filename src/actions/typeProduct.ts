"use server";

import {
  deleteTypeProductSchema,
  insertTypeProductSchema,
  updateTypeProductSchema,
} from "@/db/schemas";

import { revalidatePath } from "next/cache";
import { getProductsByTypeProductId } from "@/services/product";
import { typeProductException } from "@/exceptions/typeProduct";
import {
  addTypeProduct,
  deleteTypeProduct,
  editTypeProduct,
  getTypeProductById,
} from "@/services/typeProduct";

export async function createTypeProductAction(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();

    const validatedFields = insertTypeProductSchema.safeParse({
      name: name,
    });

    if (!validatedFields.success) {
      return typeProductException.misMatchData();
    }

    if (name) {
      await addTypeProduct({
        name: name,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "Create type product successfully",
        result: null,
      };
    } else {
      return typeProductException.createError(
        "type product name or file url or abbreviation is required."
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return typeProductException.createError(error?.message);
    }
    return typeProductException.createError("An unknown error occurred.");
  }
}

export async function updateTypeProductAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const name = formData.get("name")?.toString();

    const validatedFields = updateTypeProductSchema.safeParse({
      id: id,
      name: name,
    });
    if (!validatedFields.success) {
      return typeProductException.updateFail();
    }

    if (name) {
      const responseTypeProductById = await getTypeProductById(id);

      if (!responseTypeProductById) {
        return typeProductException.createError("ID not found");
      }
      const payload = {
        id: id,
        name: name,
      };

      await editTypeProduct(payload);

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update type product successfully",
        result: null,
      };
    } else {
      return typeProductException.createError("id or name are required.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return typeProductException.createError(error?.message);
    }
    return typeProductException.createError("An unknown error occurred.");
  }
}

export async function deleteTypeProductAction({ id }: { id: string }) {
  try {
    const validatedFields = deleteTypeProductSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return typeProductException.deleteFail();
    }

    if (id) {
      const responseProductsByTypeProductId = await getProductsByTypeProductId(
        id
      );

      if (
        responseProductsByTypeProductId &&
        responseProductsByTypeProductId?.length > 0
      ) {
        return typeProductException.createError(
          "This type product is associated with existing products and cannot be deleted."
        );
      }

      await deleteTypeProduct(id);

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "delete type product successfully",
        result: null,
      };
    } else {
      return typeProductException.createError("id is required.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return typeProductException.createError(error?.message);
    }
    return typeProductException.createError("An unknown error occurred.");
  }
}
