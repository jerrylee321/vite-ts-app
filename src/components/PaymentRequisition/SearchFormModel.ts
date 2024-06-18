import { APIDateSchema } from "frontend-common/src/apis/models/APIDate";
import dateRange from "frontend-common/src/yup/dateRange";
import { InferType, object, string } from "yup";
import { z } from "zod";

/**
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormFunction useQueryPaymentRequisition
 *
 * @empfForm
 * @empfFormPortal orso
 * @empfFormFunction useQueryPaymentRequisition
 */
export const SearchFormSchema = object({
  billingRefNo: string()
    .optional()
    .i18nLabel(
      "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.billlingRefNo.label"
    ),
  transferType: string()
    .optional()
    .i18nLabel(
      "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.transferType.label"
    ),
  submissionRefNo: string()
    .optional()
    .i18nLabel(
      "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.submissionRefNo.label"
    ),
  paymentNotificationDateRange: dateRange()
    .i18nLabel(
      "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.paymentNotificationDateRange.label"
    )
    .mapTo({
      tupleNames: ["paymentNotificationDateFrom", "paymentNotificationDateTo"],
    }),
});

export type SearchFormModel = InferType<typeof SearchFormSchema>;

export const searchFormInitialValues: SearchFormModel = {
  billingRefNo: "",
  transferType: "",
  submissionRefNo: "",
  paymentNotificationDateRange: [null, null],
};

// TODO: Map data to real api request [#1469]
const MockSearchRequestSchema = z.object({
  searchCode: z.enum(["HISTORICAL", "LATEST", "OVERDUE"]),
  trCode: z.string(),
  schemeCode: z.string(),
  billingRefNo: z.string().optional(),
  transferType: z.string().optional(),
  submissionRefNo: z.string().optional(),
  paymentNotificationDateFrom: APIDateSchema.optional(),
  paymentNotificationDateTo: APIDateSchema.optional(),
});

export type MockSearchRequest = z.input<typeof MockSearchRequestSchema>;
