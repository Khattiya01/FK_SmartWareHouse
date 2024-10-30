import { forgotPasswordType } from "@/types/requests/forgotPassword";
import { z, ZodType } from "zod";

export const forgotPasswordSchema: ZodType<forgotPasswordType> = z.object({
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").min(1, { message: "จำเป็นต้องระบุอีเมล" }),
}) as ZodType<forgotPasswordType>;
