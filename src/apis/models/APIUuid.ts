import { z } from "zod";

// Not using .uuid() in validation as some `UUID` received from
// backend API might not be UUID v4, eg. orsoClientUuid
export const APINoHyphenCapitalUuidInputSchema = z
  .string()
  .transform((x) => x.replace(/-/g, "").toUpperCase());
