import * as yup from "yup";

export const allTransferDataProcessingTransferType = [
  "MMB_SCHEME_TRAN",
  "MMB_INTRA_GROUP",
  "MMB",
] as const;
export const TransferDataProcessingTransferTypeSchema = yup
  .string()
  .oneOf(allTransferDataProcessingTransferType)
  .required();
export type TransferDataProcessingTransferType = yup.InferType<
  typeof TransferDataProcessingTransferTypeSchema
>;

export const allTransferCaseMemberIdType = ["HKID", "Passport"] as const;
export const TransferCaseMemberIdTypeSchema = yup
  .string()
  .oneOf(allTransferCaseMemberIdType)
  .required();
export type TransferCaseMemberIdType = yup.InferType<
  typeof TransferCaseMemberIdTypeSchema
>;

export interface TransferTrusteeOption {
  name: string;
  value: string;
}

export interface TransferSchemeOption {
  trusteeId: string;
  uuid: string;
  name: string;
}

export const TrusteeAddressSchema = yup.object({
  country: yup.string().optional().i18nLabel("TrusteeAddress.field.country"),
  city: yup.string().optional().i18nLabel("TrusteeAddress.field.city"),
  room: yup.string().optional().i18nLabel("TrusteeAddress.field.room"),
  floor: yup.string().optional().i18nLabel("TrusteeAddress.field.floor"),
  block: yup.string().optional().i18nLabel("TrusteeAddress.field.block"),
  building: yup.string().optional().i18nLabel("TrusteeAddress.field.building"),
  street: yup.string().optional().i18nLabel("TrusteeAddress.field.street"),
  district: yup.string().optional().i18nLabel("TrusteeAddress.field.district"),
  postalCode: yup
    .string()
    .optional()
    .i18nLabel("TrusteeAddress.field.postalCode"),
});

export type TrusteeAddress = yup.InferType<typeof TrusteeAddressSchema>;

export const TransferCreateFormMemberBaseSchema = yup.object({
  rowId: yup.number().integer().required().documentation({ hidden: true }),
  orsoAccountNumber: yup
    .string()
    .optional()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.orsoAccountNumber.label"
    ),
  mpfAccountNumber: yup
    .string()
    .optional()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.mpfAccountNumber.label"
    ),
  surnameZh: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.surnameZh.label"
    ),
  surnameEn: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.surnameEn.label"
    ),
  givenNameZh: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.givenNameZh.label"
    ),
  givenNameEn: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.givenNameEn.label"
    ),
  memberIdType: TransferCaseMemberIdTypeSchema.i18nLabel(
    "TransferDataProcessingCreateForm.memberTransferDetail.memberIdType.label"
  ),
  memberIdNumber: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.memberTransferDetail.memberIdNumber.label"
    ),
});

export const TransferCreateFormMemberSchemeTransferSchema =
  TransferCreateFormMemberBaseSchema.shape({
    isNewMember: yup
      .boolean()
      .optional()
      .i18nLabel(
        "TransferDataProcessingCreateForm.memberTransferDetail.isNewMember.label"
      ),
    orsoSchemeJoinDate: yup
      .date()
      .typeError("TransferDataProcessingCreateForm.errors.required")
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.memberTransferDetail.orsoSchemeJoinDate.label"
      ),
  });

export const TransferCreateFormMemberIntraGroupTransferSchema =
  TransferCreateFormMemberBaseSchema.shape({
    isNewMember: yup
      .boolean()
      .optional()
      .i18nLabel(
        "TransferDataProcessingCreateForm.memberTransferDetail.isNewMember.label"
      ),
    orsoSchemeJoinDate: yup
      .date()
      .typeError("TransferDataProcessingCreateForm.errors.required")
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.memberTransferDetail.orsoSchemeJoinDate.label"
      ),
    existingEmployerEmploymentDate: yup
      .date()
      .typeError("TransferDataProcessingCreateForm.errors.required")
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.memberTransferDetail.existingEmployerEmploymentDate.label"
      ),
  });

export const TransferCreateFormMemberMmbTransferSchema =
  TransferCreateFormMemberBaseSchema;

export type TransferCreateFormMemberBaseModel = yup.InferType<
  typeof TransferCreateFormMemberBaseSchema
>;
export type TransferCreateFormMemberSchemeTransferModel = yup.InferType<
  typeof TransferCreateFormMemberSchemeTransferSchema
>;
export type TransferCreateFormMemberIntraGroupTransferModel = yup.InferType<
  typeof TransferCreateFormMemberIntraGroupTransferSchema
>;
export type TransferCreateFormMemberMmbTransferModel = yup.InferType<
  typeof TransferCreateFormMemberMmbTransferSchema
>;

function makeMemberListSchema<T extends TransferCreateFormMemberBaseModel>(
  memberSchema: yup.ObjectSchema<T>
) {
  return yup
    .array()
    .of(memberSchema)
    .min(1, "TransferDataProcessingCreateForm.errors.atLeastOneMember")
    .required();
}

export const TransferCreateFormBaseSchema = yup.object({
  orsoTrusteeId: yup
    .string()
    .required()
    .i18nLabel("TransferDataProcessingCreateForm.orsoTrusteeId.label"),
  orsoSchemeName: yup
    .string()
    .required()
    .i18nLabel("TransferDataProcessingCreateForm.orsoSchemeName.label"),
  orsoTrusteeRegistrationNumber: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.orsoTrusteeRegistrationNumber.label"
    ),
  orsoOrsoEmployerName: yup
    .string()
    .required()
    .i18nLabel("TransferDataProcessingCreateForm.orsoOrsoEmployerName.label"),
  orsoOrsoEmployerAccountNumber: yup
    .string()
    .required()
    .i18nLabel(
      "TransferDataProcessingCreateForm.orsoOrsoEmployerAccountNumber.label"
    ),
  orsoTrusteeAddress: TrusteeAddressSchema.required().i18nLabel(
    "TransferDataProcessingCreateForm.orsoTrusteeAddress.title"
  ),
  mpfTrusteeName: yup
    .string()
    .required()
    .i18nLabel("TransferDataProcessingCreateForm.mpfTrusteeName.label"),
  mpfSchemeUuid: yup
    .string()
    .required()
    .i18nLabel("TransferDataProcessingCreateForm.mpfSchemeUuid.label"),
});

/**
 * @empfForm
 * @empfFormPortal trustee
 *
 * @empfForm
 * @empfFormPortal orso
 */
export const TransferCreateFormSchemeTransferSchema =
  TransferCreateFormBaseSchema.shape({
    transferType: yup
      .string()
      .oneOf(["MMB_SCHEME_TRAN"] as const)
      .required()
      .documentation({ hidden: true }),
    orsoTrusteeEffectiveDateOfTransfer: yup
      .date()
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.orsoTrusteeEffectiveDateOfTransfer.label"
      ),
    mpfMpfEmployerName: yup
      .string()
      .required()
      .i18nLabel("TransferDataProcessingCreateForm.mpfMpfEmployerName.label"),
    mpfMpfEmployerAccountNumber: yup
      .string()
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.mpfMpfEmployerAccountNumber.label"
      ),
    mpfPayrollGroupCode: yup
      .string()
      .required()
      .i18nLabel("TransferDataProcessingCreateForm.mpfPayrollGroupCode.label"),
    memberList: makeMemberListSchema(
      TransferCreateFormMemberSchemeTransferSchema
    ),
  });

/**
 * @empfForm
 * @empfFormPortal trustee
 *
 * @empfForm
 * @empfFormPortal orso
 */
export const TransferCreateFormIntraGroupTransferSchema =
  TransferCreateFormBaseSchema.shape({
    transferType: yup
      .string()
      .oneOf(["MMB_INTRA_GROUP"] as const)
      .required()
      .documentation({ hidden: true }),
    orsoTrusteeEffectiveDateOfTransfer: yup
      .date()
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.orsoTrusteeEffectiveDateOfTransfer.label"
      ),
    mpfMpfEmployerName: yup
      .string()
      .required()
      .i18nLabel("TransferDataProcessingCreateForm.mpfMpfEmployerName.label"),
    mpfMpfEmployerAccountNumber: yup
      .string()
      .required()
      .i18nLabel(
        "TransferDataProcessingCreateForm.mpfMpfEmployerAccountNumber.label"
      ),
    mpfPayrollGroupCode: yup
      .string()
      .required()
      .i18nLabel("TransferDataProcessingCreateForm.mpfPayrollGroupCode.label"),
    memberList: makeMemberListSchema(
      TransferCreateFormMemberIntraGroupTransferSchema
    ),
  });

/**
 * @empfForm
 * @empfFormPortal trustee
 *
 * @empfForm
 * @empfFormPortal orso
 */
export const TransferCreateFormMmbTransferSchema =
  TransferCreateFormBaseSchema.shape({
    transferType: yup
      .string()
      .oneOf(["MMB"] as const)
      .required()
      .documentation({ hidden: true }),
    memberList: makeMemberListSchema(TransferCreateFormMemberMmbTransferSchema),
  });

export type TransferCreateFormBaseModel = yup.InferType<
  typeof TransferCreateFormBaseSchema
>;
export type TransferCreateFormSchemeTransferModel = yup.InferType<
  typeof TransferCreateFormSchemeTransferSchema
>;
export type TransferCreateFormIntraGroupTransferModel = yup.InferType<
  typeof TransferCreateFormIntraGroupTransferSchema
>;
export type TransferCreateFormMmbTransferModel = yup.InferType<
  typeof TransferCreateFormMmbTransferSchema
>;

export type TransferDataProcessingCreateFormModel =
  | TransferCreateFormSchemeTransferModel
  | TransferCreateFormIntraGroupTransferModel
  | TransferCreateFormMmbTransferModel;

export type TransferDataProcessingCreateFormKeys =
  | keyof TransferCreateFormSchemeTransferModel
  | keyof TransferCreateFormIntraGroupTransferModel
  | keyof TransferCreateFormMmbTransferModel;

export const trusteeAddressInitialValue: TrusteeAddress = {
  country: "",
  city: "",
  room: "",
  floor: "",
  block: "",
  building: "",
  street: "",
  district: "",
  postalCode: "",
};

export const transferCreateFormBaseInitialValue: TransferCreateFormBaseModel =
  Object.freeze({
    orsoTrusteeId: "",
    orsoSchemeName: "",
    orsoTrusteeRegistrationNumber: "",
    orsoOrsoEmployerName: "",
    orsoOrsoEmployerAccountNumber: "",
    orsoTrusteeAddress: trusteeAddressInitialValue,
    mpfTrusteeName: "",
    mpfSchemeUuid: "",
  });

export const transferCreateFormSchemeTransferInitialValue: TransferCreateFormSchemeTransferModel =
  Object.freeze({
    ...transferCreateFormBaseInitialValue,
    transferType: "MMB_SCHEME_TRAN",
    orsoTrusteeEffectiveDateOfTransfer: undefined as unknown as Date,
    mpfMpfEmployerName: "",
    mpfMpfEmployerAccountNumber: "",
    mpfPayrollGroupCode: "",
    memberList: [],
  });

export const transferCreateFormIntraGroupTransferInitialValue: TransferCreateFormIntraGroupTransferModel =
  Object.freeze({
    ...transferCreateFormBaseInitialValue,
    transferType: "MMB_INTRA_GROUP",
    orsoTrusteeEffectiveDateOfTransfer: undefined as unknown as Date,
    mpfMpfEmployerName: "",
    mpfMpfEmployerAccountNumber: "",
    mpfPayrollGroupCode: "",
    memberList: [],
  });

export const transferCreateFormMmbTransferInitialValue: TransferCreateFormMmbTransferModel =
  Object.freeze({
    ...transferCreateFormBaseInitialValue,
    transferType: "MMB",
    memberList: [],
  });

export const getTransferCreateFormMemberBaseInitialValue = (
  newRowIdx: number
): TransferCreateFormMemberBaseModel =>
  Object.freeze({
    rowId: newRowIdx,
    orsoAccountNumber: "",
    mpfAccountNumber: "",
    surnameZh: "",
    surnameEn: "",
    givenNameZh: "",
    givenNameEn: "",
    memberIdType: "HKID",
    memberIdNumber: "",
  });

export const getTransferCreateFormMemberSchemeTransferInitialValue = (
  newRowIdx: number
): TransferCreateFormMemberSchemeTransferModel =>
  Object.freeze({
    ...getTransferCreateFormMemberBaseInitialValue(newRowIdx),
    isNewMember: undefined,
    orsoSchemeJoinDate: undefined as unknown as Date,
  });

export const getTransferCreateFormMemberIntraGroupTransferInitialValue = (
  newRowIdx: number
): TransferCreateFormMemberIntraGroupTransferModel =>
  Object.freeze({
    ...getTransferCreateFormMemberBaseInitialValue(newRowIdx),
    isNewMember: undefined,
    orsoSchemeJoinDate: undefined as unknown as Date,
    existingEmployerEmploymentDate: undefined as unknown as Date,
  });

export const getTransferCreateFormMemberMmbTransferInitialValue = (
  newRowIdx: number
): TransferCreateFormMemberMmbTransferModel =>
  Object.freeze({
    ...getTransferCreateFormMemberBaseInitialValue(newRowIdx),
  });
