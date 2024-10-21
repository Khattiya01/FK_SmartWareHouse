import { CreatCategoryType } from "@/types/requests/createCategory";
import { z, ZodType } from "zod";

export const CreateCategory: ZodType<CreatCategoryType> = z.object({
  image_url: z.array(z.unknown()).min(1, { message: "At least one image is required" }),
  name: z
    .string()
    .min(1, { message: "Category name is required" }),
    abbreviation: z
    .string()
    .min(3, { message: "Abbreviation is required" }),
}) as ZodType<CreatCategoryType>;
