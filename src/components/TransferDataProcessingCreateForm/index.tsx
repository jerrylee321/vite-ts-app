import React, { ReactElement, useCallback } from "react";
import { Trans } from "react-i18next";
import { Form, FormikProps } from "formik";

import { useValidationErrorDialog } from "../../hooks/useValidationErrorDialog";
import { CommonOption } from "../../models/option";
import { OrsoTrusteeItem } from "../../models/orsoTrusteeItem";
import ActionBar, {
  ActionBarPrimaryButton,
  ActionBarSecondaryButton,
} from "../ActionBar";

import MemberTransferDetailSection from "./MemberTransferDetailSection";
import NewMPFSchemeSection from "./NewMPFSchemeSection";
import OriginalORSOSchemeSection from "./OriginalORSOSchemeSection";
import {
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormSchemeTransferModel,
  TransferDataProcessingTransferType,
  TransferSchemeOption,
  TransferTrusteeOption,
} from "./TransferDataProcessingCreateFormModel";
import TypeOfTransferSection from "./TypeOfTransferSection";

interface TransferCreateFormBaseProps {
  transferType: TransferDataProcessingTransferType | undefined;
  onTransferTypeChange: (
    transferType: TransferDataProcessingTransferType
  ) => void;
  trusteeOptions: TransferTrusteeOption[];
  schemeOptions: TransferSchemeOption[];
  orsoTrusteeList: OrsoTrusteeItem[];
  countryOptions: CommonOption[];
  districtOptions: CommonOption[];
  errorRowIndexes: Set<number>;
}
interface TransferCreateFormSchemeTransferProps
  extends TransferCreateFormBaseProps {
  transferType: "MMB_SCHEME_TRAN";
  formikProps: FormikProps<TransferCreateFormSchemeTransferModel>;
}
interface TransferCreateFormIntraGroupTransferProps
  extends TransferCreateFormBaseProps {
  transferType: "MMB_INTRA_GROUP";
  formikProps: FormikProps<TransferCreateFormIntraGroupTransferModel>;
}
interface TransferCreateFormMmbTransferProps
  extends TransferCreateFormBaseProps {
  transferType: "MMB";
  formikProps: FormikProps<TransferCreateFormMmbTransferModel>;
}
type TransferDataProcessingCreateFormProps =
  | TransferCreateFormSchemeTransferProps
  | TransferCreateFormIntraGroupTransferProps
  | TransferCreateFormMmbTransferProps;

/**
 * @empfPortal trustee
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a form component for "Transfer Data Processing - Create". It wraps the form field components.
 * @empfProp formikProps
 * @empfProp transferType
 * @empfProp onTransferTypeChange
 * @empfProp trusteeOptions
 * @empfProp orsoTrusteeList
 * @empfProp schemeOptions
 * @empfProp countryOptions
 * @empfProp districtOptions
 * @empfProp errorRowIndexes
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 *
 * @empfPortal orso
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a form component for "Transfer Data Processing - Create". It wraps the form field components.
 * @empfProp formikProps
 * @empfProp transferType
 * @empfProp onTransferTypeChange
 * @empfProp trusteeOptions
 * @empfProp orsoTrusteeList
 * @empfProp schemeOptions
 * @empfProp countryOptions
 * @empfProp districtOptions
 * @empfProp errorRowIndexes
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 */
const TransferDataProcessingCreateForm = (
  props: TransferDataProcessingCreateFormProps
): ReactElement => {
  const {
    transferType,
    onTransferTypeChange,
    trusteeOptions,
    schemeOptions,
    countryOptions,
    districtOptions,
    formikProps,
    errorRowIndexes,
    orsoTrusteeList,
  } = props;

  const { showValidationErrorDialog } = useValidationErrorDialog();

  const onSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      showValidationErrorDialog([formikProps.errors["memberList"]]);
      formikProps.handleSubmit(e);
    },
    [showValidationErrorDialog, formikProps]
  );

  const onClearButtonClick = useCallback(() => {
    formikProps.resetForm();
  }, [formikProps]);

  return (
    <Form
      data-testid="TransferDataProcessingCreateForm"
      className="flex flex-col gap-section"
      onSubmit={onSubmit}
    >
      <TypeOfTransferSection
        transferType={transferType}
        onTransferTypeChange={onTransferTypeChange}
      />
      <OriginalORSOSchemeSection
        formikProps={props.formikProps}
        orsoTrusteeList={orsoTrusteeList}
        countryOptions={countryOptions}
        districtOptions={districtOptions}
      />
      <NewMPFSchemeSection
        formikProps={props.formikProps}
        trusteeOptions={trusteeOptions}
        schemeOptions={schemeOptions}
      />
      <MemberTransferDetailSection
        formikProps={props.formikProps}
        errorRowIndexes={errorRowIndexes}
      />
      <ActionBar className="fixed top-auto bottom-0 right-0 w-full">
        <ActionBarSecondaryButton
          type="button"
          data-testid="clearBtn"
          onClick={onClearButtonClick}
        >
          <Trans i18nKey="TransferDataProcessingCreateForm.actionBar.clearButton" />
        </ActionBarSecondaryButton>
        <ActionBarPrimaryButton type="submit" data-testid="submitBtn">
          <Trans i18nKey="TransferDataProcessingCreateForm.actionBar.submitButton" />
        </ActionBarPrimaryButton>
      </ActionBar>
    </Form>
  );
};

export default TransferDataProcessingCreateForm;
