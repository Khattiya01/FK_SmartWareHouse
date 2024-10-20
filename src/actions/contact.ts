"use server";

import {
  deleteProductSchema,
  insertContactSchema,
  updatelogoSchema,
} from "@/db/schemas";
import { contactException } from "@/exceptions/contact";
import { logoException } from "@/exceptions/logos";
import { productException } from "@/exceptions/products";
import { addContact } from "@/services/contact";
import { deleteFiles } from "@/services/files";
import { editLogos } from "@/services/logo";
import { deleteProducts } from "@/services/product";
import { revalidatePath } from "next/cache";

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

export async function updateProductAction({
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
  } catch (error: any) {
    return logoException.createError(error?.message);
  }
}

export async function deleteProductAction({
  id,
  file_url,
}: {
  id: string;
  file_url: string;
}) {
  try {
    const validatedFields = deleteProductSchema.safeParse({
      id: id,
    });
    if (!validatedFields.success) {
      return productException.deleteFail();
    }

    if (id) {
      const allFilesURL = file_url.split(",");

      await deleteProducts(id).then(async () => {
        for (const file of allFilesURL) {
          await deleteFiles(file);
        }
      });

      revalidatePath("/admin");
      return {
        success: true,
        message: "delete product successfully",
        result: null,
      };
    } else {
      return productException.createError("id is required.");
    }
  } catch (error: any) {
    return productException.createError(error?.message);
  }
}
