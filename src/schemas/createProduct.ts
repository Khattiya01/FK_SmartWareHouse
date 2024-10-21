import { CreatProductType } from "@/types/requests/createProduct";
import { z, ZodType } from "zod";

export const CreateProduct: ZodType<CreatProductType> = z.object({
  category_id: z.string().min(1, { message: "Category id is required" }),
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "description is required" }),
  price: z.string().min(1, { message: "price is required" }),
  main_image: z
    .array(z.unknown())
    .min(1, { message: "At least one main image is required" }),
  map_image: z
    .array(z.unknown())
    .min(1, { message: "At least one map image is required" }),
  others_image: z
    .array(z.unknown())
    .min(1, { message: "At least one others image is required" }),
  address: z.string().min(1, { message: "address is required" }),
  province: z.string().min(1, { message: "province is required" }),
  district: z.string().min(1, { message: "district is required" }),
  sub_district: z.string().min(1, { message: "sub_district is required" }),
  postal_code: z.string().min(1, { message: "postal_code is required" }),
  tel: z.string().optional(),
  phone: z.string().optional(),
  remark: z.string().optional(),
}) as ZodType<CreatProductType>;
