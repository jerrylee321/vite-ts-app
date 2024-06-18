import { numericSchema } from "frontend-common/src/yup/numeric";
import { array, InferType, mixed, object, string } from "yup";

import {
  IntraGroupTransferViewModel,
  MmbTransferViewModel,
  SchemeTransferViewModel,
  TransferType,
} from "../PaymentRequisitionContents";

import {
  IntraGroupBenefitsDetailsRowModel,
  IntraGroupBenefitsDetailsRowSchema,
  MmbBenefitsDetailsRowModel,
  MmbBenefitsDetailsRowSchema,
  SchemeBenefitsDetailsRowModel,
  SchemeBenefitsDetailsRowSchema,
} from "./BenefitsDetailsRowSchema";
import {
  mapViewModelToMmbBenefitsDetailsRows,
  mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows,
} from "./mappers";

export const FormTableName = "benefitsDetails";

const CommonTotalPaymentAmountSchema = numericSchema(40, 2).required();

const CommonUpdatePaymentRequisitionFormSchema = object({
  transferType: mixed<TransferType>()
    .oneOf(["SchemeTransfer", "MmbTransfer", "IntraGroupTransfer", "Unknown"])
    .defined()
    .default("Unknown")
    .i18nLabel(
      "PaymentRequisitionDetailScreen.transferTypesSection.typesOfTransfer"
    ),
  billRefNo: string()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.billingRefNo.label"
    ),
  trusteeComment: string()
    .max(1000)
    .optional()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.trusteeInputSection.trusteeComment.label"
    ),
  paymentMethod: string()
    .max(100)
    .required()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.paymentMethod.label"
    ),
  bankName: string()
    .max(200)
    .required()
    .i18nLabel("PaymentRequisitionDetailScreen.PaymentDetails.bankName.label"),
  bankAcctNo: string()
    .max(40)
    .matches(/^[0-9]*$/)
    .required()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.bankAccountNumber.label"
    ),
  chequeNo: string()
    .max(20)
    .optional()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.chequeNumber.label"
    ),
});

const calculateMemberSubtotal = (
  member: SchemeBenefitsDetailsRowModel
): number => {
  return (
    member.eeMmb +
    member.eeOrso +
    member.eePostMpf +
    member.eePreMpf +
    member.erMmb +
    member.erOrso +
    member.erPostMpf +
    member.erPreMpf
  );
};

/**
 * @empfForm
 * @empfFormPortal trustee
 *
 * @empfForm
 * @empfFormPortal orso
 */
export const UpdateSchemePaymentRequisitionFormSchema =
  CommonUpdatePaymentRequisitionFormSchema.shape({
    totalPaymentAmount: CommonTotalPaymentAmountSchema.test(
      "unmatch-total",
      "PaymentRequisitionDetailScreen.error.unmatchTotal",
      (value, testContext) => {
        if (testContext.parent[FormTableName]) {
          return (
            (
              testContext.parent[
                FormTableName
              ] as SchemeBenefitsDetailsRowModel[]
            ).reduce(
              (total, member) => total + calculateMemberSubtotal(member),
              0
            ) === value
          );
        }

        return true;
      }
    ).i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.totalPaymentAmount.label"
    ),
    [FormTableName]: array(SchemeBenefitsDetailsRowSchema).default([]),
  });

export type UpdateSchemePaymentRequisitionFormModel = InferType<
  typeof UpdateSchemePaymentRequisitionFormSchema
>;

/**
 * @empfForm
 * @empfFormPortal trustee
 *
 * @empfForm
 * @empfFormPortal orso
 */
export const UpdateIntraGroupPaymentRequisitionFormSchema =
  CommonUpdatePaymentRequisitionFormSchema.shape({
    totalPaymentAmount: CommonTotalPaymentAmountSchema.test(
      "unmatch-total",
      "PaymentRequisitionDetailScreen.error.unmatchTotal",
      (value, testContext) => {
        if (testContext.parent[FormTableName]) {
          return (
            (
              testContext.parent[
                FormTableName
              ] as IntraGroupBenefitsDetailsRowModel[]
            ).reduce(
              (total, member) => total + calculateMemberSubtotal(member),
              0
            ) === value
          );
        }

        return true;
      }
    ).i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.totalPaymentAmount.label"
    ),
    [FormTableName]: array(IntraGroupBenefitsDetailsRowSchema).default([]),
  });

export type UpdateIntraGroupPaymentRequisitionFormModel = InferType<
  typeof UpdateIntraGroupPaymentRequisitionFormSchema
>;

/**
 * @empfForm
 * @empfFormPortal trustee
 *
 * @empfForm
 * @empfFormPortal orso
 */
export const UpdateMmbPaymentRequisitionFormSchema =
  CommonUpdatePaymentRequisitionFormSchema.shape({
    totalPaymentAmount: CommonTotalPaymentAmountSchema.test(
      "unmatch-total",
      "PaymentRequisitionDetailScreen.error.unmatchTotal",
      (value, testContext) => {
        if (testContext.parent[FormTableName]) {
          return (
            (
              testContext.parent[FormTableName] as MmbBenefitsDetailsRowModel[]
            ).reduce((total, member) => {
              return total + member.mmbAmount;
            }, 0) === value
          );
        }

        return true;
      }
    ).i18nLabel(
      "PaymentRequisitionDetailScreen.PaymentDetails.totalPaymentAmount.label"
    ),
    [FormTableName]: array(MmbBenefitsDetailsRowSchema).default([]),
  });

export type UpdateMmbPaymentRequisitionFormModel = InferType<
  typeof UpdateMmbPaymentRequisitionFormSchema
>;

export const getSchemeUpdateFormInitialValues = (
  viewModel: SchemeTransferViewModel
): UpdateSchemePaymentRequisitionFormModel => {
  return {
    transferType: "SchemeTransfer",
    billRefNo: viewModel.paymentInfo.billingRefNo,
    trusteeComment: viewModel.trusteeComment ?? "",
    paymentMethod: viewModel.paymentInfo.paymentMethod?.key ?? "",
    bankName: viewModel.paymentInfo.bankName ?? "",
    bankAcctNo: viewModel.paymentInfo.bankAcctNo ?? "",
    chequeNo: viewModel.paymentInfo.chequeNo ?? "",
    totalPaymentAmount: viewModel.paymentInfo.totalAmount ?? 0,
    benefitsDetails:
      mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows(viewModel),
  };
};

export const getIntraGroupUpdateFormInitialValues = (
  viewModel: IntraGroupTransferViewModel
): UpdateIntraGroupPaymentRequisitionFormModel => {
  return {
    transferType: "IntraGroupTransfer",
    billRefNo: viewModel.paymentInfo.billingRefNo,
    trusteeComment: viewModel.trusteeComment ?? "",
    paymentMethod: viewModel.paymentInfo.paymentMethod?.key ?? "",
    bankName: viewModel.paymentInfo.bankName ?? "",
    bankAcctNo: viewModel.paymentInfo.bankAcctNo ?? "",
    chequeNo: viewModel.paymentInfo.chequeNo ?? "",
    totalPaymentAmount: viewModel.paymentInfo.totalAmount ?? 0,
    benefitsDetails:
      mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows(viewModel),
  };
};

export const getMmbUpdateFormInitialValues = (
  viewModel: MmbTransferViewModel
): UpdateMmbPaymentRequisitionFormModel => {
  return {
    transferType: "MmbTransfer",
    billRefNo: viewModel.paymentInfo.billingRefNo,
    trusteeComment: viewModel.trusteeComment ?? "",
    paymentMethod: viewModel.paymentInfo.paymentMethod?.key ?? "",
    bankName: viewModel.paymentInfo.bankName ?? "",
    bankAcctNo: viewModel.paymentInfo.bankAcctNo ?? "",
    chequeNo: viewModel.paymentInfo.chequeNo ?? "",
    totalPaymentAmount: viewModel.paymentInfo.totalAmount ?? 0,
    benefitsDetails: mapViewModelToMmbBenefitsDetailsRows(viewModel),
  };
};

export type UpdateFormModel =
  | UpdateMmbPaymentRequisitionFormModel
  | UpdateSchemePaymentRequisitionFormModel
  | UpdateIntraGroupPaymentRequisitionFormModel;

export const isFormModelSchemeTransfer = (
  value: UpdateFormModel
): value is UpdateSchemePaymentRequisitionFormModel => {
  return value.transferType === "SchemeTransfer";
};

export const isFormModelIntraGroupTransfer = (
  value: UpdateFormModel
): value is UpdateIntraGroupPaymentRequisitionFormModel => {
  return value.transferType === "IntraGroupTransfer";
};

export const isFormModelMmbTransfer = (
  value: UpdateFormModel
): value is UpdateMmbPaymentRequisitionFormModel => {
  return value.transferType === "MmbTransfer";
};
