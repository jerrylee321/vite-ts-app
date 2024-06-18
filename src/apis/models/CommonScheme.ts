import { z } from "zod";

export const CommonOptionsSchema = z.object({
  key: z.string(),
  zhHK: z.string().nullable(),
  zhCN: z.string().nullable(),
  en: z.string(),
});

export type CommonOptionsItem = z.infer<typeof CommonOptionsSchema>;
