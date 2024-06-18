import { z } from "zod";

export const APII18nMessageSchema = z.object({
  en: z.string().nullish(),
  zhHK: z.string().nullish(),
  zhCN: z.string().nullish(),
});

export type APII18nMessage = z.infer<typeof APII18nMessageSchema>;
