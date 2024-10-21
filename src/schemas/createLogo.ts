import { CreateLogoType } from "@/types/requests/createLogo";
import { z, ZodType } from "zod";

export const CreateLogo: ZodType<CreateLogoType> = z.object({
  image_url: z
    .array(z.unknown())
    .min(1, { message: "At least one image is required" }),
}) as ZodType<CreateLogoType>;
