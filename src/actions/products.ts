"use server";

import {
  deleteProductSchema,
  insertProductSchema,
  updatelogoSchema,
} from "@/db/schemas";
import { logoException } from "@/exceptions/logos";
import { productException } from "@/exceptions/products";
import { deleteFiles } from "@/services/files";
import { editLogos } from "@/services/logo";
import { addProducts, deleteProducts } from "@/services/product";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData) {
  try {
    const category_id = formData.get("category_id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const price = formData.get("price")?.toString();

    const main_image = formData.get("main_image")?.toString();
    const sub_image_1 = formData.get("sub_image_1")?.toString();
    const map_image = formData.get("map_image")?.toString();
    const others_image = formData.get("others_image")?.toString();
    const address = formData.get("address")?.toString();
    const province = formData.get("province")?.toString();
    const district = formData.get("district")?.toString();
    const sub_district = formData.get("sub_district")?.toString();
    const postal_code = formData.get("postal_code")?.toString();
    const tel = formData.get("tel")?.toString();
    const phone = formData.get("phone")?.toString();

    const validatedFields = insertProductSchema.safeParse({
      category_id: category_id,
      name: name,
      description: description,
      price: price,
      main_image: main_image,
      sub_image_1: sub_image_1,
      map_image: map_image,
      others_image: others_image,
      address: address,
      province: province,
      district: district,
      sub_district: sub_district,
      postal_code: postal_code,
      tel: tel,
      phone: phone,
    });

    console.log("validatedFields", validatedFields);

    if (!validatedFields.success) {
      return productException.misMatchData();
    }

    if (
      category_id &&
      name &&
      description &&
      price &&
      main_image &&
      map_image &&
      others_image &&
      address &&
      province &&
      district &&
      sub_district &&
      postal_code
    ) {
      await addProducts({
        category_id: category_id,
        name: name,
        description: description,
        price: price,
        main_image: main_image,
        sub_image_1: sub_image_1 ?? "",
        map_image: map_image,
        others_image: others_image,
        address: address,
        province: province,
        district: district,
        sub_district: sub_district,
        postal_code: postal_code,
        tel: tel ?? "",
        phone: phone ?? "",
      });

      revalidatePath("/admin");
      return {
        success: true,
        message: "Create product successfully",
        result: null,
      };
    } else {
      return productException.misMatchData();
    }
  } catch (error: any) {
    return productException.createError(error?.message);
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
