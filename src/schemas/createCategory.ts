import { CreatCategoryType } from "@/types/requests/createCategory";
import { z, ZodType } from "zod";

export const CreateCategory: ZodType<CreatCategoryType> = z.object({
  image_url: z.unknown(),
  name: z
    .string()
    .min(1, { message: "Category name is required" }),
}) as ZodType<CreatCategoryType>;
