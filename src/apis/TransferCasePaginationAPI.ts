import z from "zod";

export const APITransferCasePaginationResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  caseListCnt: z.number(), // pageRecords
  totalCnt: z.number(), // totalRecords
});

export type APITransferCasePaginationResponse = z.infer<
  typeof APITransferCasePaginationResponseSchema
>;
