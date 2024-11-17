"use server";

import { deletelogoSchema } from "@/db/schemas";
import {
  insertHomePageDetailSchema,
  updateHomePageDetailSchema,
  updateIsActiveHomePageDetailSchema,
} from "@/db/schemas/homeDetail";
import { homePageDetailException } from "@/exceptions/homePageDetail";
import { logoException } from "@/exceptions/logos";
import {
  addHomePageDetail,
  deleteHomePageDetail,
  editHomePageDetail,
  editHomePageDetailOtherIsActiveFalse,
  editIsActiveHomePageDetail,
  getHomeDetailById,
  getHomeDetailIsActive,
} from "@/services/homeDetail";
import { revalidatePath } from "next/cache";
import { deleteFileAction } from "./files";

export async function createHomePageDetailAction(formData: FormData) {
  try {
    const content_01_title = formData.get("content_01_title")?.toString();
    const banner_title = formData.get("banner_title")?.toString();
    const content_01_detail = formData.get("content_01_detail")?.toString();
    const content_02_detail = formData.get("content_02_detail")?.toString();
    const content_02_image_url = formData
      .get("content_02_image_url")
      ?.toString();
    const banner_image_url = formData.get("banner_image_url")?.toString();
    const contact_image_url = formData.get("contact_image_url")?.toString();
    const validatedFields = insertHomePageDetailSchema.safeParse({
      banner_title: banner_title,
      content_01_title: content_01_title,
      content_01_detail: content_01_detail,
      content_02_detail: content_02_detail,
      content_02_image_url: content_02_image_url,
      banner_image_url: banner_image_url,
      contact_image_url: contact_image_url,
    });
    if (!validatedFields.success) {
      return homePageDetailException.createError("The Image URL is incorrect.");
    }
    if (
      content_01_title &&
      banner_title &&
      content_01_detail &&
      content_02_detail &&
      content_02_image_url &&
      banner_image_url &&
      contact_image_url
    ) {
      await addHomePageDetail({
        banner_image_url: banner_image_url,
        banner_title: banner_title,
        content_01_title: content_01_title,
        content_01_detail: content_01_detail,
        content_02_image_url: content_02_image_url,
        content_02_detail: content_02_detail,
        contact_image_url: contact_image_url,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "Create home detail successfully",
        result: null,
      };
    } else {
      return logoException.createError("Image URL is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return homePageDetailException.createError(error?.message);
    }
  }
}

export async function updateHomePageDetailAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const content_01_title = formData.get("content_01_title")?.toString();
    const banner_title = formData.get("banner_title")?.toString();
    const content_01_detail = formData.get("content_01_detail")?.toString();
    const content_02_detail = formData.get("content_02_detail")?.toString();
    const content_02_image_url = formData
      .get("content_02_image_url")
      ?.toString();
    const banner_image_url = formData.get("banner_image_url")?.toString();
    const contact_image_url = formData.get("contact_image_url")?.toString();

    const validatedFields = updateHomePageDetailSchema.safeParse({
      id: id,
      content_01_title: content_01_title,
      content_01_detail: content_01_detail,
      banner_title: banner_title,
      content_02_detail: content_02_detail,
      content_02_image_url: content_02_image_url,
      banner_image_url: banner_image_url,
      contact_image_url: contact_image_url,
    });

    if (!validatedFields.success) {
      return homePageDetailException.updateFail();
    }
    if (
      id &&
      content_01_title &&
      banner_title &&
      content_01_detail &&
      content_02_detail &&
      content_02_image_url &&
      banner_image_url &&
      contact_image_url
    ) {
      const responseHomeDetailById = await getHomeDetailById(id);

      if (!responseHomeDetailById) {
        return homePageDetailException.createError("ID not found");
      }

      await editHomePageDetail({
        id: id,
        banner_image_url: banner_image_url,
        content_01_title: content_01_title,
        banner_title: banner_title,
        content_01_detail: content_01_detail,
        content_02_image_url: content_02_image_url,
        content_02_detail: content_02_detail,
        contact_image_url: contact_image_url,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update home detail successfully",
        result: null,
      };
    } else {
      return homePageDetailException.createError("id are required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return homePageDetailException.createError(error?.message);
    }
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

    const validatedFields = updateIsActiveHomePageDetailSchema.safeParse({
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
          responseGetHomeDetailIsActive?.id &&
          responseGetHomeDetailIsActive?.id !== id
        ) {
          editHomePageDetailOtherIsActiveFalse(
            responseGetHomeDetailIsActive?.id
          );
        }
      } else {
        if (responseGetHomeDetailIsActive?.id === id) {
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
  } catch (error) {
    if (error instanceof Error) {
      return homePageDetailException.createError(error?.message);
    }
  }
}

export async function deleteHomePageDetailAction({
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
      return homePageDetailException.deleteFail();
    }

    if (id) {
      const allFilesURL = file_url.split(",");
      await deleteHomePageDetail(id).then(async () => {
        for (const file of allFilesURL) {
          await deleteFileAction({ file_url: file });
        }
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "delete home page detail successfully",
        result: null,
      };
    } else {
      return homePageDetailException.createError("id is required.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return homePageDetailException.createError(error?.message);
    }
  }
}
