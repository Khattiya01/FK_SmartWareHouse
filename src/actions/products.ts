"use server";

import {
  deleteProductSchema,
  insertProductSchema,
  updateProductSchema,
  updatIsActiveProductSchema,
} from "@/db/schemas";
import { productException } from "@/exceptions/products";
import {
  addProducts,
  deleteProducts,
  editIsActiveProduct,
  editProduct,
  getLastProductByCategoryId,
  getProductsById,
} from "@/services/product";
import { revalidatePath } from "next/cache";
import { deleteFileAction } from "./files";
import { getCategoryById } from "@/services/category";

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
    const remark = formData.get("remark")?.toString();

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
      remark: remark,
    });

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
      const responseCategoryById = await getCategoryById(category_id);
      const responseLastProduct = await getLastProductByCategoryId(category_id);
      if (responseCategoryById) {
        let generateProductId = "";
        if (responseLastProduct && responseLastProduct.product_id) {
          const intProductID = String(
            parseInt(responseLastProduct.product_id.split("-")[1]) + 1
          ).padStart(5, "0");
          generateProductId =
            responseCategoryById.abbreviation + "-" + intProductID;
        } else {
          generateProductId = responseCategoryById.abbreviation + "-" + "00001";
        }

        await addProducts({
          category_id: category_id,
          name: name,
          description: description,
          price: price,
          main_image: main_image,
          map_image: map_image,
          others_image: others_image,
          address: address,
          province: province,
          district: district,
          sub_district: sub_district,
          postal_code: postal_code,
          tel: tel ?? "",
          phone: phone ?? "",
          remark: remark ?? "",
          product_id: generateProductId,
        });

        revalidatePath("/admin");
        return {
          success: true,
          message: "Create product successfully",
          result: null,
        };
      } else {
        return productException.createError("Category id not found");
      }
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
    const remark = formData.get("remark")?.toString();

    const validatedFields = updateProductSchema.safeParse({
      id: id,
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
      remark: remark,
    });

    console.log("validatedFields", validatedFields.error);
    if (!validatedFields.success) {
      return productException.updateFail();
    }

    if (
      id &&
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
      const responseProductsById = await getProductsById(id);

      if (!responseProductsById) {
        return productException.createError("ID not found");
      }

      const responseCategoryById = await getCategoryById(category_id);

      if (responseCategoryById) {
        const responseLastProduct = await getLastProductByCategoryId(
          category_id
        );

        let generateProductId = responseProductsById.product_id ?? undefined;
        if (responseProductsById.category_id != category_id) {
          if (responseLastProduct && responseLastProduct.product_id) {
            const intProductID = String(
              parseInt(responseLastProduct.product_id.split("-")[1]) + 1
            ).padStart(5, "0");
            generateProductId =
              responseCategoryById.abbreviation + "-" + intProductID;
          } else {
            generateProductId =
              responseCategoryById.abbreviation + "-" + "00001";
          }
        }

        await editProduct({
          id: id,
          category_id: category_id,
          name: name,
          description: description,
          price: price,
          main_image: main_image,
          map_image: map_image,
          others_image: others_image,
          address: address,
          province: province,
          district: district,
          sub_district: sub_district,
          postal_code: postal_code,
          tel: tel ?? "",
          phone: phone ?? "",
          remark: remark ?? "",
          product_id: generateProductId,
        });

        revalidatePath("/admin");
        return {
          success: true,
          message: "update product successfully",
          result: null,
        };
      } else {
        return productException.createError("Category id not found");
      }
    } else {
      return productException.createError("payload are required.");
    }
  } catch (error: any) {
    return productException.createError(error?.message);
  }
}

export async function updateIsActiveProductAction({
  formData,
  id,
}: {
  formData: FormData;
  id: string;
}) {
  try {
    const is_active = formData.get("is_active")?.toString();

    const validatedFields = updatIsActiveProductSchema.safeParse({
      id,
      is_active: is_active === "true" ? true : false,
    });
    if (!validatedFields.success) {
      return productException.updateFail();
    }
    if ((is_active === "true" || is_active === "false") && id) {
      const responseProductsById = await getProductsById(id);

      if (!responseProductsById) {
        return productException.createError("ID not found");
      }

      await editIsActiveProduct({
        id: id,
        is_active: is_active === "true" ? true : false,
      });

      revalidatePath("/", "layout");
      return {
        success: true,
        message: "update product successfully",
        result: null,
      };
    } else {
      return productException.createError("isActive or id are required.");
    }
  } catch (error: any) {
    return productException.createError(error?.message);
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
          await deleteFileAction({ file_url: file });
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
