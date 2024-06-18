import { z } from "zod";

export const APIBooleanSchema = z.enum(["Y", "N"]).transform((x) => x === "Y");

export const APIBooleanInputSchema = z
  .boolean()
  .transform((x) => (x ? "Y" : "N"));
