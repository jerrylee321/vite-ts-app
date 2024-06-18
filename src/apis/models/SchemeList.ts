import { z } from "zod";

export const SchemeListSchemeSchema = z.object({
  schemeCode: z.string(),
  schemeName: z.string(),
  schemeRegNo: z.string(),
  schemeUuid: z.string(), // uuid
  trusteeCode: z.string(),
  trusteeUuid: z.string(), // uuid
});

export type SchemeListScheme = z.infer<typeof SchemeListSchemeSchema>;
