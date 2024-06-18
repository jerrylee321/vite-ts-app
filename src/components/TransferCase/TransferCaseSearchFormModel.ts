import dateRange from "frontend-common/src/yup/dateRange";
import * as yup from "yup";

/**
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormFunction useQueryTransferCase
 *
 * @empfForm
 * @empfFormPortal orso
 * @empfFormFunction useQueryTransferCase
 */
export const TransferCaseSearchFormSchema = yup.object({
  submissionDateRange: dateRange()
    .i18nLabel("TransferCase.searchSection.filter.submissionDateRange")
    .mapTo({ tupleNames: ["submissionDtStart", "submissionDtEnd"] }),
  transferType: yup
    .string()
    .optional()
    .i18nLabel("TransferCase.searchSection.filter.transferType"),
  transferEffectiveDateRange: dateRange()
    .i18nLabel("TransferCase.searchSection.filter.transferEffectiveDateRange")
    .mapTo({ tupleNames: ["effectiveDtStart", "effectiveDtEnd"] }),
  referenceNumber: yup
    .string()
    .optional()
    .i18nLabel("TransferCase.searchSection.filter.transferType"),
});

export type TransferCaseSearchFormModel = yup.InferType<
  typeof TransferCaseSearchFormSchema
>;

export const TransferCaseSearchFormInitialValue: TransferCaseSearchFormModel =
  Object.freeze<TransferCaseSearchFormModel>({
    submissionDateRange: [null, null],
    transferType: "",
    transferEffectiveDateRange: [null, null],
    referenceNumber: "",
  });
