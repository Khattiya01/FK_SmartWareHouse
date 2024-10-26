"use server";

import {
  deleteCategorySchema,
  insertCategorySchema,
  updateCategorySchema,
} from "@/db/schemas";
import { categoryException } from "@/exceptions/category";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategoryById,
} from "@/services/category";

import { revalidatePath } from "next/cache";
import { deleteFileAction } from "./files";

export async function createCategoryAction(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const image_url = formData.get("image_url")?.toString();
    const abbreviation = formData.get("abbreviation")?.toString();

    const validatedFields = insertCategorySchema.safeParse({
      name: name,
      image_url: image_url,
      abbreviation: abbreviation,
    });

    if (!validatedFields.success) {
      return categoryException.misMatchData();
    }

    if (name && image_url && abbreviation) {
      await addCategory({
        name: name,
        image_url: image_url,
        abbreviation: abbreviation,
      });

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create category successfully",
        result: null,
      };
    } else {
      return categoryException.createError(
        "Category name or file url or abbreviation is required."
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return categoryException.createError(error?.message);
    }
    return categoryException.createError("An unknown error occurred.");
  }
}

export async function updateCategoryAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const name = formData.get("name")?.toString();
    const image_url = formData.get("image_url")?.toString();
    const abbreviation = formData.get("abbreviation")?.toString();

    const validatedFields = updateCategorySchema.safeParse({
      id: id,
      name: name,
      image_url: image_url,
      abbreviation: abbreviation,
    });
    if (!validatedFields.success) {
      return categoryException.updateFail();
    }

    if (name && image_url && abbreviation) {
      const responseCategoryById = await getCategoryById(id);

      if (!responseCategoryById) {
        return categoryException.createError("ID not found");
      }

      const payload = {
        id: id,
        name: name,
        image_url: image_url,
        abbreviation: abbreviation,
      };
      await editCategory(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "update category successfully",
        result: null,
      };
    } else {
      return categoryException.createError(
        "id or name or image_url or abbreviation are required."
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return categoryException.createError(error?.message);
    }
    return categoryException.createError("An unknown error occurred.");
  }
}

export async function deleteCategoryAction({
  id,
  file_url,
}: {
  id: string;
  file_url: string;
}) {
  try {
    const validatedFields = deleteCategorySchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return categoryException.deleteFail();
    }

    if (id) {
      const allFilesURL = file_url.split(",");

      await deleteCategory(id).then(async () => {
        for (const file of allFilesURL) {
          await deleteFileAction({ file_url: file });
        }
      });

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete category successfully",
        result: null,
      };
    } else {
      return categoryException.createError("id is required.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return categoryException.createError(error?.message);
    }
    return categoryException.createError("An unknown error occurred.");
  }
}
