import { z, ZodType } from "zod";

export const AcceptPrivacySchema: ZodType<{ accept: boolean }> = z.object({
  accept: z.boolean(),
}) as ZodType<{ accept: boolean }>;
