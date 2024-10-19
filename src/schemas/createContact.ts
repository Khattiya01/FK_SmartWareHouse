import { CreateContactType } from "@/types/requests/createContact";
import { z, ZodType } from "zod";

export const CreateContact: ZodType<CreateContactType> = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  sub_district: z.string().min(1, { message: "Sub district is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  tel: z.string().min(1, { message: "Tel is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  map_image: z.unknown(),
  bg_image: z.unknown(),
  line_id: z.string().min(1, { message: "Line id is required" }),
  line_url: z.string().min(1, { message: "Line URL is required" }),
  facebook_url: z.string().min(1, { message: "Facebook url is required" }),
  tiktok_url: z.string().min(1, { message: "Tiktok url is required" }),
  start_day_bs_hour: z
    .string()
    .min(1, { message: "Start day bs hour url is required" }),
  end_day_bs_hour: z
    .string()
    .min(1, { message: "End day bs hour url is required" }),
  is_active: z.boolean().optional(),
}) as ZodType<CreateContactType>;
