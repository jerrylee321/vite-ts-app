import z from "zod";

export const APISortingRuleStringRequestSchema = z
  .string()
  .regex(/^[A-Za-z0-9_]+ (asc|desc)$/);

export const APISortingRuleStructRequestSchema = z.object({
  id: z.string(),
  desc: z.boolean().optional(),
});

export type APISortingRule = z.input<typeof APISortingRuleStructRequestSchema>;

export const mapSortingRuleStructToString = (sort: APISortingRule): string => {
  return `${sort.id} ${sort.desc ? "desc" : "asc"}`;
};

export const APISortingRuleRequestSchema = z.union([
  APISortingRuleStringRequestSchema,
  APISortingRuleStructRequestSchema.transform(mapSortingRuleStructToString),
  z.array(APISortingRuleStructRequestSchema).transform((val) => {
    return val[0] ? mapSortingRuleStructToString(val[0]) : undefined;
  }),
]);

// page starts from 1
export const APIPaginationRequestSchema = z.object({
  pageSize: z.number().optional().default(50),
  page: z.number().optional().default(1),
  sort: APISortingRuleRequestSchema.optional(),
});

export const APIPaginationRequestTransformStringSchema = z.object({
  pageSize: z
    .number()
    .optional()
    .default(50)
    .transform((val) => `${val}`),
  page: z
    .number()
    .optional()
    .default(1)
    .transform((val) => `${val}`),
  sort: APISortingRuleRequestSchema.optional(),
});

export type APIPaginationRequest = z.input<typeof APIPaginationRequestSchema>;

export const APIPaginationResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageRecords: z.number(),
  totalPages: z.number(),
  totalRecords: z.number(),
});

export type APIPaginationResponse = z.infer<typeof APIPaginationResponseSchema>;

export const defaultLoadAllPaginationRequest = Object.freeze({
  page: 1,
  pageSize: 1000,
}) satisfies APIPaginationRequest;

export type OmitPaginationRequestParams<T extends object> = Omit<
  T,
  "pageSize" | "page" | "sort"
>;
