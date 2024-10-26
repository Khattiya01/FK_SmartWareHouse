"use server";

import {
  deletelogoSchema,
  insertlogoSchema,
  updateIsActivelogoSchema,
  updatelogoSchema,
} from "@/db/schemas";
import { fileException } from "@/exceptions/files";
import { logoException } from "@/exceptions/logos";
import { getFilesByUrl } from "@/services/files";
import {
  addLogos,
  deleteLogos,
  editIsActiveLogos,
  editLogos,
  editLogosOtherIsActiveFalse,
  getLogoById,
  getLogosIsActived,
} from "@/services/logo";
import { revalidatePath } from "next/cache";

export async function createLogoAction(formData: FormData) {
  try {
    const image_url = formData.get("image_url")?.toString();

    const validatedFields = insertlogoSchema.safeParse({
      image_url: image_url,
    });

    if (!validatedFields.success) {
      return logoException.createError("The Image URL is incorrect.");
    }

    if (image_url) {
      await addLogos({ image_url: image_url });

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create logo successfully",
        result: null,
      };
    } else {
      return logoException.createError("Image URL is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return logoException.createError(error?.message);
    }
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
      const responseLogoById = await getLogoById(id);

      if (!responseLogoById) {
        return logoException.createError("ID not found");
      }

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
  } catch (error) {
    if (error instanceof Error) {
      return logoException.createError(error?.message);
    }
  }
}

export async function updateIsActiveLogoAction({
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
      return logoException.updateFail();
    }

    if ((is_active === "true" || is_active === "false") && id) {
      const responseGetLogosIsActived = await getLogosIsActived();
      if (is_active === "true") {
        if (
          responseGetLogosIsActived &&
          responseGetLogosIsActived?.length > 0 &&
          responseGetLogosIsActived[0].id !== id
        ) {
          editLogosOtherIsActiveFalse(responseGetLogosIsActived[0].id);
        }
      } else if (
        responseGetLogosIsActived &&
        responseGetLogosIsActived?.length > 0 &&
        responseGetLogosIsActived[0].id === id
      ) {
        return logoException.createError("There are no other logos active.");
      }

      await editIsActiveLogos({
        id: id,
        is_active: is_active === "true" ? true : false,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update logo successfully",
        result: null,
      };
    } else {
      return logoException.createError("isActive or id are required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return logoException.createError(error?.message);
    }
  }
}

export async function deleteLogoAction({
  id,
  file_url,
}: {
  id: string;
  file_url: string;
}) {
  try {
    const validatedFields = deletelogoSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return logoException.deleteFail();
    }

    if (id) {
      const responseGetFilesByUrl = await getFilesByUrl(file_url);
      if (!(responseGetFilesByUrl && responseGetFilesByUrl.length > 0)) {
        return fileException.notFound();
      }

      await deleteLogos(id);

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete logo successfully",
        result: null,
      };
    } else {
      return logoException.createError("id is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return logoException.createError(error?.message);
    }
  }
}
