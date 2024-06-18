import dateRange from "frontend-common/src/yup/dateRange";
import * as yup from "yup";

export const TransferEnquiryCaseSearchFormSchema = yup.object({
  submissionDtRange: dateRange(),
  transferType: yup.string(),
  effectiveDtRange: dateRange(),
  refNo: yup.string(),
});

export type TransferEnquiryCaseSearchFormModel = yup.InferType<
  typeof TransferEnquiryCaseSearchFormSchema
>;

export const TransferEnquiryCaseSearchFormInitialValues: TransferEnquiryCaseSearchFormModel =
  {
    submissionDtRange: [null, null],
    transferType: "",
    effectiveDtRange: [null, null],
    refNo: "",
  };
