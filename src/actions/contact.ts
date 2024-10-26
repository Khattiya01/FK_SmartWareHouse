"use server";

import {
  deleteContactSchema,
  insertContactSchema,
  updateIsActiveContactSchema,
} from "@/db/schemas";
import { contactException } from "@/exceptions/contact";
import {
  addContact,
  deleteContact,
  editContact,
  editContactOtherIsActiveFalse,
  editIsActiveContact,
  getContactById,
  getContactIsActive,
} from "@/services/contact";
import { revalidatePath } from "next/cache";
import { deleteFileAction } from "./files";

export async function createContactAction(formData: FormData) {
  try {
    const tel = formData.get("tel")?.toString();
    const phone = formData.get("phone")?.toString();
    const line_id = formData.get("line_id")?.toString();
    const line_url = formData.get("line_url")?.toString();
    const facebook_url = formData.get("facebook_url")?.toString();
    const tiktok_url = formData.get("tiktok_url")?.toString();
    const start_day_bs_hour = formData.get("start_day_bs_hour")?.toString();
    const end_day_bs_hour = formData.get("end_day_bs_hour")?.toString();
    const map_image = formData.get("map_image")?.toString();
    const bg_image = formData.get("bg_image")?.toString();
    const address = formData.get("address")?.toString();
    const province = formData.get("province")?.toString();
    const district = formData.get("district")?.toString();
    const sub_district = formData.get("sub_district")?.toString();
    const postal_code = formData.get("postal_code")?.toString();

    const payload = {
      tel: tel,
      phone: phone,
      line_id: line_id,
      line_url: line_url,
      facebook_url: facebook_url,
      tiktok_url: tiktok_url,
      start_day_bs_hour: start_day_bs_hour,
      end_day_bs_hour: end_day_bs_hour,
      map_image: map_image,
      bg_image: bg_image,
      address: address,
      province: province,
      district: district,
      sub_district: sub_district,
      postal_code: postal_code,
    };
    const validatedFields = insertContactSchema.safeParse(payload);

    console.log("validatedFields", validatedFields);

    if (!validatedFields.success) {
      return contactException.misMatchData();
    }

    if (
      tel &&
      phone &&
      line_id &&
      line_url &&
      facebook_url &&
      tiktok_url &&
      start_day_bs_hour &&
      end_day_bs_hour &&
      map_image &&
      bg_image &&
      address &&
      province &&
      district &&
      sub_district &&
      postal_code
    ) {
      await addContact(payload);

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create contact successfully",
        result: null,
      };
    } else {
      return contactException.misMatchData();
    }
  } catch (error: any) {
    return contactException.createError(error?.message);
  }
}

export async function updateContactAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const tel = formData.get("tel")?.toString();
    const phone = formData.get("phone")?.toString();
    const line_id = formData.get("line_id")?.toString();
    const line_url = formData.get("line_url")?.toString();
    const facebook_url = formData.get("facebook_url")?.toString();
    const tiktok_url = formData.get("tiktok_url")?.toString();
    const start_day_bs_hour = formData.get("start_day_bs_hour")?.toString();
    const end_day_bs_hour = formData.get("end_day_bs_hour")?.toString();
    const map_image = formData.get("map_image")?.toString();
    const bg_image = formData.get("bg_image")?.toString();
    const address = formData.get("address")?.toString();
    const province = formData.get("province")?.toString();
    const district = formData.get("district")?.toString();
    const sub_district = formData.get("sub_district")?.toString();
    const postal_code = formData.get("postal_code")?.toString();

    const payload = {
      tel: tel,
      phone: phone,
      line_id: line_id,
      line_url: line_url,
      facebook_url: facebook_url,
      tiktok_url: tiktok_url,
      start_day_bs_hour: start_day_bs_hour,
      end_day_bs_hour: end_day_bs_hour,
      map_image: map_image,
      bg_image: bg_image,
      address: address,
      province: province,
      district: district,
      sub_district: sub_district,
      postal_code: postal_code,
    };
    const validatedFields = insertContactSchema.safeParse(payload);

    console.log("validatedFields", validatedFields);
    if (!validatedFields.success) {
      return contactException.updateFail();
    }

    if (
      id &&
      tel &&
      phone &&
      line_id &&
      line_url &&
      facebook_url &&
      tiktok_url &&
      start_day_bs_hour &&
      end_day_bs_hour &&
      map_image &&
      bg_image &&
      address &&
      province &&
      district &&
      sub_district &&
      postal_code
    ) {
      const responseContactById = await getContactById(id);

      if (!responseContactById) {
        return contactException.createError("ID not found");
      }

      await editContact({
        id: id,
        tel: tel,
        phone: phone,
        line_id: line_id,
        line_url: line_url,
        facebook_url: facebook_url,
        tiktok_url: tiktok_url,
        start_day_bs_hour: start_day_bs_hour,
        end_day_bs_hour: end_day_bs_hour,
        map_image: map_image,
        bg_image: bg_image,
        address: address,
        province: province,
        district: district,
        sub_district: sub_district,
        postal_code: postal_code,
      });

      revalidatePath("/admin");
      return {
        success: true,
        message: "update contact successfully",
        result: null,
      };
    } else {
      return contactException.createError("payload are required.");
    }
  } catch (error: any) {
    return contactException.createError(error?.message);
  }
}

export async function updateIsActiveContactAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const is_active = formData.get("is_active")?.toString();

    const validatedFields = updateIsActiveContactSchema.safeParse({
      id,
      is_active: is_active === "true" ? true : false,
    });
    if (!validatedFields.success) {
      return contactException.updateFail();
    }

    if ((is_active === "true" || is_active === "false") && id) {
      const responseGetContactIsActived = await getContactIsActive();
      if (is_active === "true") {
        if (responseGetContactIsActived) {
          editContactOtherIsActiveFalse(responseGetContactIsActived.id);
        }
      } else if (responseGetContactIsActived) {
        return contactException.createError("There are no other logos active.");
      }

      await editIsActiveContact({
        id: id,
        is_active: is_active === "true" ? true : false,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update Contact successfully",
        result: null,
      };
    } else {
      return contactException.createError("isActive or id are required.");
    }
  } catch (error: any) {
    return contactException.createError(error?.message);
  }
}

export async function deleteContactAction({
  id,
  file_url,
}: {
  id: string;
  file_url: string;
}) {
  try {
    const validatedFields = deleteContactSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return contactException.deleteFail();
    }

    if (id) {
      const allFilesURL = file_url.split(",");

      await deleteContact(id).then(async () => {
        for (const file of allFilesURL) {
          await deleteFileAction({ file_url: file });
        }
      });

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete contact successfully",
        result: null,
      };
    } else {
      return contactException.createError("id is required.");
    }
  } catch (error: any) {
    return contactException.createError(error?.message);
  }
}
