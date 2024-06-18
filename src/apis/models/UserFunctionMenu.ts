import z from "zod";

const FunctionTypes = ["Page", "__Unknown"] as const;

export const UserFunctionMenuItemSchema = z.object({
  category: z.string(),
  functionType: z.enum(FunctionTypes).catch(() => "__Unknown" as const),
  functionId: z.string().nullable(),
  functionName: z.string(),
});

export type UserFunctionMenuItem = z.infer<typeof UserFunctionMenuItemSchema>;
