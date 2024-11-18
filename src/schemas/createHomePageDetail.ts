import { CreatHomePageDetailType } from "@/types/requests/createHomeDetail";
import { z, ZodType } from "zod";

export const CreateHomePageDetail: ZodType<CreatHomePageDetailType> = z.object({
  // banner_image_url: z.unknown(),
  banner_image_url: z.array(z.unknown()).min(1, { message: "At least one banner image is required" }),
  banner_title: z.string().min(1, { message: "Banner title is required" }),
  banner_subtitle: z.string().optional(),
  content_01_title: z.string().min(1, { message: "Content title is required" }),
  content_01_detail: z
    .string()
    .min(1, { message: "Content detail is required" }),
  content_02_image_url: z.array(z.unknown()).min(1, { message: "At least one content 2 image is required" }),
  content_02_detail: z
    .string()
    .min(1, { message: "Content 2 detail is required" }),
  contact_image_url: z.array(z.unknown()).min(1, { message: "At least one contact image is required" }),
  is_active: z.boolean().optional(),
}) as ZodType<CreatHomePageDetailType>;
