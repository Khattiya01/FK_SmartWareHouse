"use server";

import {
  deleteCategorySchema,
  insertCategorySchema,
  updateIsActivelogoSchema,
  updatelogoSchema,
} from "@/db/schemas";
import { categoryException } from "@/exceptions/category";
import { homePageDetailException } from "@/exceptions/homePageDetail";
import { logoException } from "@/exceptions/logos";
import { addCategory, deleteCategory } from "@/services/category";
import {
  editHomePageDetailOtherIsActiveFalse,
  editIsActiveHomePageDetail,
  getHomeDetailIsActive,
} from "@/services/homeDetail";
import { editLogos } from "@/services/logo";
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

export async function updateLogoAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const image_url = formData.get("image_url")?.toString();

    const validatedFields = updatelogoSchema.safeParse({
      id,
      image_url,
    });
    if (!validatedFields.success) {
      return logoException.updateFail();
    }

    if (image_url && id) {
      const payload = {
        id: id,
        image_url,
      };
      await editLogos(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "update logo successfully",
        result: null,
      };
    } else {
      return logoException.createError("Image URL or id are required.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return logoException.createError(error?.message);
    }
    return logoException.createError("An unknown error occurred.");
  }
}

export async function updateIsActiveHomePageDetailAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const is_active = formData.get("is_active")?.toString();

    const validatedFields = updateIsActivelogoSchema.safeParse({
      id,
      is_active: is_active === "true" ? true : false,
    });
    if (!validatedFields.success) {
      return homePageDetailException.updateFail();
    }

    if ((is_active === "true" || is_active === "false") && id) {
      const responseGetHomeDetailIsActive = await getHomeDetailIsActive();
      if (is_active === "true") {
        if (
          responseGetHomeDetailIsActive &&
          responseGetHomeDetailIsActive.id !== id
        ) {
          editHomePageDetailOtherIsActiveFalse(
            responseGetHomeDetailIsActive.id
          );
        }
      } else {
        if (
          responseGetHomeDetailIsActive &&
          responseGetHomeDetailIsActive.id === id
        ) {
          return homePageDetailException.createError(
            "There are no other home detail active."
          );
        }
      }

      await editIsActiveHomePageDetail({
        id: id,
        is_active: is_active === "true" ? true : false,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update home page detail successfully",
        result: null,
      };
    } else {
      return homePageDetailException.createError(
        "isActive or id are required."
      );
    }
  } catch (error: any) {
    return homePageDetailException.createError(error?.message);
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
