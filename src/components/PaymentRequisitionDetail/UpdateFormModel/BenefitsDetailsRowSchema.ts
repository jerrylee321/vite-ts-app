import { numericSchema } from "frontend-common/src/yup/numeric";
import { boolean, InferType, mixed, object, string } from "yup";

import { TransferType } from "../PaymentRequisitionContents";

const CommonBenefitsDetailsRowSchema = object({
  transferType: mixed<TransferType>()
    .oneOf(["SchemeTransfer", "MmbTransfer", "IntraGroupTransfer", "Unknown"])
    .defined()
    .default("Unknown")
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.typeOfTransfer"
    ),
  surnameZh: string()
    .defined()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.surnameZh"
    ),
  givenNameZh: string()
    .defined()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.givenNameZh"
    ),
  surnameEn: string()
    .defined()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.surnameEn"
    ),
  givenNameEn: string()
    .defined()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.givenNameEn"
    ),
  idType: string()
    .defined()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdType"
    ),
  idNo: string()
    .defined()
    .nullable()
    .i18nLabel(
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdNo"
    ),
});

export const SchemeBenefitsDetailsRowSchema =
  CommonBenefitsDetailsRowSchema.shape({
    newMemberFlg: boolean().defined().documentation({ hidden: true }),
    eePreMpf: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.preMpfServiceEeBenefits"
      ),
    eePostMpf: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.postMpfServiceEeBenefits"
      ),
    eeOrso: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.orsoEmployeeBenefits"
      ),
    eeMmb: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.EePortionMmbAmount"
      ),
    erPreMpf: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.preMpfServiceErBenefits"
      ),
    erPostMpf: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.postMpfServiceErBenefits"
      ),
    erOrso: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.orsoEmployerBenefits"
      ),
    erMmb: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.ErPortionMmbAmount"
      ),
  });

export type SchemeBenefitsDetailsRowModel = InferType<
  typeof SchemeBenefitsDetailsRowSchema
>;

export const IntraGroupBenefitsDetailsRowSchema =
  SchemeBenefitsDetailsRowSchema;

export type IntraGroupBenefitsDetailsRowModel = InferType<
  typeof IntraGroupBenefitsDetailsRowSchema
>;

export const MmbBenefitsDetailsRowSchema = CommonBenefitsDetailsRowSchema.shape(
  {
    mmbAmount: numericSchema(10, 2)
      .default(0)
      .required()
      .i18nLabel(
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.mmbTransfer.mmbAmount"
      ),
  }
);

export type MmbBenefitsDetailsRowModel = InferType<
  typeof MmbBenefitsDetailsRowSchema
>;
