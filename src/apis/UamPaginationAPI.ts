import z from "zod";

import { APIPaginationResponse } from "./PaginationAPI";

export const APIUamSortingRuleStringRequestSchema = z
  .string()
  .regex(/^(-|\+)[A-Za-z0-9_]+$/);

export const APIUamSortingRuleStructRequestSchema = z.object({
  id: z.string(),
  desc: z.boolean().optional(),
});

export type APIUamSortingRule = z.input<
  typeof APIUamSortingRuleStructRequestSchema
>;

export const mapUamSortingRuleStructToArray = (
  sort: APIUamSortingRule
): string[] => {
  return [`${sort.desc ? "-" : "+"}${sort.id}`];
};

export const APIUamSortingRuleRequestSchema = z
  .array(APIUamSortingRuleStructRequestSchema)
  .transform((val) => {
    return val[0] ? mapUamSortingRuleStructToArray(val[0]) : undefined;
  });

// uam pagination pageNo starts from 0
export const APIUamPaginationRequestSchema = z.object({
  pageSize: z.number().optional().default(50),
  pageNo: z
    .number()
    .optional()
    .default(1)
    .transform((pageSize) => pageSize - 1),
  sort: APIUamSortingRuleRequestSchema.optional(),
});

export type APIUamPaginationRequest = z.input<
  typeof APIUamPaginationRequestSchema
>;

export const APIUamPaginationResponseSchema = z.object({
  numberOfElements: z.number(),
  pageable: z.union([
    z.object({
      pageNumber: z.number(),
      pageSize: z.number(),
    }),
    z.literal("INSTANCE"),
  ]),
  totalPages: z.number(),
  totalElements: z.number(),
});

export type APIUamPaginationResponse = z.infer<
  typeof APIUamPaginationResponseSchema
>;

export const mapAPIUamPaginationResponseToAPIPaginationResponse = <
  T extends APIUamPaginationResponse
>(
  res: T
): APIPaginationResponse & Omit<T, keyof APIUamPaginationResponse> => {
  const { totalPages, numberOfElements, totalElements, pageable, ...rest } =
    res;

  return {
    ...rest,
    pageSize: pageable === "INSTANCE" ? 1000 : pageable.pageSize,
    totalPages: totalPages,
    // Convert uam pagination pageNo(start from 0) to pagination pageNo(start from 1)
    page: pageable === "INSTANCE" ? 1 : pageable.pageNumber + 1,
    pageRecords: numberOfElements,
    totalRecords: totalElements,
  };
};

export const defaultLoadAllUamPaginationRequest: APIUamPaginationRequest =
  Object.freeze({ page: 1, pageSize: 1000 });

export type OmitUamPaginationRequestParams<T extends object> = Omit<
  T,
  "pageSize" | "pageNo" | "sort"
>;
