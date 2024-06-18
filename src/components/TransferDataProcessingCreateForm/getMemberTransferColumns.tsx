import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";
import { Typography } from "@mui/material";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import FormDatePicker from "frontend-common/src/components/FormDatePicker";
import FormInput from "frontend-common/src/components/FormInput";
import FormSelect, {
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";
import { FormTableColumnsGetter } from "frontend-common/src/components/FormTable";
import { MessageKey } from "frontend-common/src/i18n/LocaleModel";

import { useFormikListItemState } from "../../utils/formTable";

import {
  allTransferCaseMemberIdType,
  TransferCaseMemberIdType,
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormMemberIntraGroupTransferModel,
  TransferCreateFormMemberMmbTransferModel,
  TransferCreateFormMemberSchemeTransferModel,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormSchemeTransferModel,
  TransferDataProcessingCreateFormModel,
} from "./TransferDataProcessingCreateFormModel";

// NOTE: This must match the field name of the corr. list in form model
const formTableName = "memberList";

type TransferCreateFormMemberCellProps =
  | CellProps<TransferCreateFormMemberSchemeTransferModel>
  | CellProps<TransferCreateFormMemberIntraGroupTransferModel>
  | CellProps<TransferCreateFormMemberMmbTransferModel>;

type FormMemberModel<FormT extends TransferDataProcessingCreateFormModel> =
  FormT["memberList"][number];
function useFormikMemberListState<
  T extends TransferDataProcessingCreateFormModel
>(
  rowIndex: number,
  values: T,
  errors: FormikErrors<T>,
  touched: FormikTouched<T>
): {
  memberValues: FormMemberModel<T>;
  memberIsErrors: Partial<Record<keyof FormMemberModel<T>, boolean>>;
  memberHelperTexts: Partial<
    Record<keyof FormMemberModel<T>, string | string[]>
  >;
} {
  const listItemState = useFormikListItemState<T, FormMemberModel<T>>(
    "memberList",
    rowIndex,
    values,
    errors,
    touched
  );

  return {
    memberValues: listItemState.itemValues,
    memberIsErrors: listItemState.itemIsErrors,
    memberHelperTexts: listItemState.itemHelperTexts,
  };
}

const OrsoAccountNumberCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].orsoAccountNumber`}
      data-testid={`${formTableName}[${row.index}].orsoAccountNumber`}
      value={memberValues.orsoAccountNumber}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.orsoAccountNumber}
      helperText={memberHelperTexts.orsoAccountNumber}
    />
  );
};

const orsoAccountNumberColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.orsoAccountNumber.label",
  id: "orsoAccountNumber",
  accessor: "orsoAccountNumber",
  Cell: OrsoAccountNumberCell,
} as const;

const MpfAccountNumberCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);
  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].mpfAccountNumber`}
      data-testid={`${formTableName}[${row.index}].mpfAccountNumber`}
      value={memberValues.mpfAccountNumber}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.mpfAccountNumber}
      helperText={memberHelperTexts.mpfAccountNumber}
    />
  );
};

const mpfAccountNumberColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.mpfAccountNumber.label",
  id: "mpfAccountNumber",
  accessor: "mpfAccountNumber",
  Cell: MpfAccountNumberCell,
} as const;

const SurnameZhCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].surnameZh`}
      data-testid={`${formTableName}[${row.index}].surnameZh`}
      value={memberValues.surnameZh}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.surnameZh}
      helperText={memberHelperTexts.surnameZh}
    />
  );
};

const surnameZhColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.surnameZh.label",
  id: "surnameZh",
  accessor: "surnameZh",
  Cell: SurnameZhCell,
  options: {
    required: true,
  },
} as const;

const SurnameEnCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].surnameEn`}
      data-testid={`${formTableName}[${row.index}].surnameEn`}
      value={memberValues.surnameEn}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.surnameEn}
      helperText={memberHelperTexts.surnameEn}
    />
  );
};

const surnameEnColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.surnameEn.label",
  id: "surnameEn",
  accessor: "surnameEn",
  Cell: SurnameEnCell,
  options: {
    required: true,
  },
} as const;

const GivenNameZhCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].givenNameZh`}
      data-testid={`${formTableName}[${row.index}].givenNameZh`}
      value={memberValues.givenNameZh}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.givenNameZh}
      helperText={memberHelperTexts.givenNameZh}
    />
  );
};

const givenNameZhColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.givenNameZh.label",
  id: "givenNameZh",
  accessor: "givenNameZh",
  Cell: GivenNameZhCell,
  options: {
    required: true,
  },
} as const;

const GivenNameEnCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].givenNameEn`}
      data-testid={`${formTableName}[${row.index}].givenNameEn`}
      value={memberValues.givenNameEn}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.givenNameEn}
      helperText={memberHelperTexts.givenNameEn}
    />
  );
};

const givenNameEnColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.givenNameEn.label",
  id: "givenNameEn",
  accessor: "givenNameEn",
  Cell: GivenNameEnCell,
  options: {
    required: true,
  },
} as const;

const memberIdTypeMessageId: Record<TransferCaseMemberIdType, MessageKey> = {
  HKID: "TransferCaseMemberIdType.hkid",
  Passport: "TransferCaseMemberIdType.passport",
};

const MemberIdTypeCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { t } = useTranslation();

  const memberIdTypeOptions = allTransferCaseMemberIdType.map((id) => ({
    key: id,
    name: t(memberIdTypeMessageId[id]),
  }));

  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormSelect
      fullWidth={true}
      id={`${formTableName}[${row.index}].memberIdType`}
      data-testid={`${formTableName}[${row.index}].memberIdType`}
      name={`${formTableName}[${row.index}].memberIdType`}
      value={memberValues.memberIdType}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.memberIdType}
      helperText={memberHelperTexts.memberIdType}
    >
      {memberIdTypeOptions.map((op) => (
        <FormSelectOption key={op.key} value={op.key}>
          {op.name}
        </FormSelectOption>
      ))}
    </FormSelect>
  );
};

const memberIdTypeColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.memberIdType.label",
  id: "memberIdType",
  accessor: "memberIdType",
  Cell: MemberIdTypeCell,
  options: {
    required: true,
  },
} as const;

const MemberIdNumberCell = (
  props: TransferCreateFormMemberCellProps
): ReactElement => {
  const { row } = props;
  const { handleChange, handleBlur, values, touched, errors } =
    useFormikContext<TransferDataProcessingCreateFormModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormInput
      showErrorIcon={true}
      showHelperTextOnTop={true}
      name={`${formTableName}[${row.index}].memberIdNumber`}
      data-testid={`${formTableName}[${row.index}].memberIdNumber`}
      value={memberValues.memberIdNumber}
      onChange={handleChange}
      onBlur={handleBlur}
      error={memberIsErrors.memberIdNumber}
      helperText={memberHelperTexts.memberIdNumber}
    />
  );
};

const memberIdNumberColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.memberIdNumber.label",
  id: "memberIdNumber",
  accessor: "memberIdNumber",
  Cell: MemberIdNumberCell,
  options: {
    required: true,
  },
} as const;

const IsNewMemberCell = (
  props:
    | CellProps<TransferCreateFormMemberSchemeTransferModel>
    | CellProps<TransferCreateFormMemberIntraGroupTransferModel>
): ReactElement => {
  const { row } = props;
  const { t } = useTranslation();
  const { values } = useFormikContext<
    | TransferCreateFormSchemeTransferModel
    | TransferCreateFormIntraGroupTransferModel
  >();
  const { isNewMember } = values.memberList[row.index];

  let memberString = "-";
  if (isNewMember === true) {
    memberString = t(
      "TransferDataProcessingCreateForm.memberTransferDetail.isNewMember.new"
    );
  } else if (isNewMember === false) {
    memberString = t(
      "TransferDataProcessingCreateForm.memberTransferDetail.isNewMember.existing"
    );
  }

  return (
    <Typography
      className="font-semibold text-independence-main"
      data-testid={`${formTableName}[${row.index}].isNewMember`}
    >
      {memberString}
    </Typography>
  );
};

const isNewMemberColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.isNewMember.label",
  id: "isNewMember",
  accessor: "isNewMember",
  Cell: IsNewMemberCell,
} as const;

const OrsoSchemeJoinDateCell = (
  props:
    | CellProps<TransferCreateFormMemberSchemeTransferModel>
    | CellProps<TransferCreateFormMemberIntraGroupTransferModel>
): ReactElement => {
  const { row } = props;
  const { setFieldValue, handleBlur, values, touched, errors } =
    useFormikContext<
      | TransferCreateFormSchemeTransferModel
      | TransferCreateFormIntraGroupTransferModel
    >();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormDatePicker
      showHelperTextOnTop={true}
      showErrorIcon={true}
      name={`${formTableName}[${row.index}].orsoSchemeJoinDate`}
      data-testid={`${formTableName}[${row.index}].orsoSchemeJoinDate`}
      dateFormat="dd/MM/yyyy"
      value={memberValues.orsoSchemeJoinDate}
      onChange={setFieldValue}
      onBlur={handleBlur}
      error={memberIsErrors.orsoSchemeJoinDate}
      helperText={memberHelperTexts.orsoSchemeJoinDate}
    />
  );
};

const orsoSchemeJoinDateColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.orsoSchemeJoinDate.label",
  id: "orsoSchemeJoinDate",
  accessor: "orsoSchemeJoinDate",
  Cell: OrsoSchemeJoinDateCell,
  options: {
    required: true,
  },
} as const;

const ExistingEmployerEmploymentDateCell = (
  props: CellProps<TransferCreateFormMemberIntraGroupTransferModel>
): ReactElement => {
  const { row } = props;
  const { setFieldValue, handleBlur, values, touched, errors } =
    useFormikContext<TransferCreateFormIntraGroupTransferModel>();
  const { memberValues, memberIsErrors, memberHelperTexts } =
    useFormikMemberListState(row.index, values, errors, touched);

  return (
    <FormDatePicker
      showHelperTextOnTop={true}
      showErrorIcon={true}
      name={`${formTableName}[${row.index}].existingEmployerEmploymentDate`}
      data-testid={`${formTableName}[${row.index}].existingEmployerEmploymentDate`}
      dateFormat="dd/MM/yyyy"
      value={memberValues.existingEmployerEmploymentDate}
      onChange={setFieldValue}
      onBlur={handleBlur}
      error={memberIsErrors.existingEmployerEmploymentDate}
      helperText={memberHelperTexts.existingEmployerEmploymentDate}
    />
  );
};

const existingEmployerEmploymentDateColumn = {
  i18nKey:
    "TransferDataProcessingCreateForm.memberTransferDetail.existingEmployerEmploymentDate.label",
  id: "existingEmployerEmploymentDate",
  accessor: "existingEmployerEmploymentDate",
  Cell: ExistingEmployerEmploymentDateCell,
  options: {
    required: true,
  },
} as const;

export const getSchemeTransferMemberColumns: FormTableColumnsGetter<
  TransferCreateFormMemberSchemeTransferModel,
  TransferCreateFormSchemeTransferModel
> = () => {
  return [
    orsoAccountNumberColumn,
    isNewMemberColumn,
    orsoSchemeJoinDateColumn,
    mpfAccountNumberColumn,
    surnameZhColumn,
    givenNameZhColumn,
    surnameEnColumn,
    givenNameEnColumn,
    memberIdTypeColumn,
    memberIdNumberColumn,
  ];
};

export const getIntraGroupTransferMemberColumns: FormTableColumnsGetter<
  TransferCreateFormMemberIntraGroupTransferModel,
  TransferCreateFormIntraGroupTransferModel
> = () => {
  return [
    orsoAccountNumberColumn,
    isNewMemberColumn,
    orsoSchemeJoinDateColumn,
    mpfAccountNumberColumn,
    surnameZhColumn,
    givenNameZhColumn,
    surnameEnColumn,
    givenNameEnColumn,
    memberIdTypeColumn,
    memberIdNumberColumn,
    existingEmployerEmploymentDateColumn,
  ];
};

export const getMmbTransferMemberColumns: FormTableColumnsGetter<
  TransferCreateFormMemberMmbTransferModel,
  TransferCreateFormMmbTransferModel
> = () => {
  return [
    orsoAccountNumberColumn,
    mpfAccountNumberColumn,
    surnameZhColumn,
    givenNameZhColumn,
    surnameEnColumn,
    givenNameEnColumn,
    memberIdTypeColumn,
    memberIdNumberColumn,
  ];
};
