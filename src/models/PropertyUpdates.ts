import { z } from "zod";

export const PropertyUpdatesSchema = z.object({
  propertyName: z.string(),
  originalValue: z.coerce.string().nullable(),
  newValue: z.coerce.string().nullable(),
});

export type PropertyUpdatesModel = z.infer<typeof PropertyUpdatesSchema>;
