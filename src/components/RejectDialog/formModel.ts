import * as yup from "yup";

import { RejectType } from "../../apis/models/RejectOptions";

const CommonRejectDialogFormSchema = yup.object({
  rejectType: yup.string().oneOf(Object.values(RejectType)).required(),
});

export const RequiredReasonRejectDialogFormSchema =
  CommonRejectDialogFormSchema.shape({
    reason: yup.string().min(1).required("RejectDialog.error.requried"),
  });

export const OptionalReasonRejectDialogFormSchema =
  CommonRejectDialogFormSchema.shape({
    reason: yup.string().optional().default(""),
  });

export type RejectDialogFormModel =
  | yup.InferType<typeof RequiredReasonRejectDialogFormSchema>
  | yup.InferType<typeof OptionalReasonRejectDialogFormSchema>;

export const getRejectDialogFormInitialValue = (
  rejectTypes: RejectType[]
): RejectDialogFormModel => {
  return {
    reason: "",
    rejectType: rejectTypes[0] ?? RejectType.redo,
  };
};
