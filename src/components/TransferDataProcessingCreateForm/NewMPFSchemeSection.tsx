import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FormikProps } from "formik";
import Accordion from "frontend-common/src/components/Accordion";
import FormInput from "frontend-common/src/components/FormInput";
import FormSelect, {
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";

import {
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormSchemeTransferModel,
  TransferSchemeOption,
  TransferTrusteeOption,
} from "./TransferDataProcessingCreateFormModel";

interface NewMPFSchemeSectionProps {
  formikProps:
    | FormikProps<TransferCreateFormSchemeTransferModel>
    | FormikProps<TransferCreateFormIntraGroupTransferModel>
    | FormikProps<TransferCreateFormMmbTransferModel>;
  trusteeOptions: TransferTrusteeOption[];
  schemeOptions: TransferSchemeOption[];
}

/**
 * @empfPortal trustee
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for new MPF information of "Transfer Data Processing - Create". It wraps the form components.
 * @empfProp formikProps
 * @empfProp trusteeOptions
 * @empfProp schemeOptions
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 *
 * @empfPortal orso
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for new MPF information of "Transfer Data Processing - Create". It wraps the form components.
 * @empfProp formikProps
 * @empfProp trusteeOptions
 * @empfProp schemeOptions
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 */
const NewMPFSchemeSection = (props: NewMPFSchemeSectionProps): ReactElement => {
  const { formikProps, trusteeOptions, schemeOptions } = props;
  const { values, handleChange, errors, touched } = formikProps;
  const { t } = useTranslation();

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors,
    touched,
  });

  return (
    <Accordion
      title={t("TransferDataProcessingCreateForm.newMPFSchemeSection.title")}
    >
      <fieldset
        data-testid="NewMPFSchemeSection"
        className="m-0 grid grid-cols-12 gap-4 border-none p-0"
      >
        <FormSelect
          data-testid="mpfTrusteeName"
          id="mpfTrusteeName"
          name="mpfTrusteeName"
          className="col-span-6"
          value={values.mpfTrusteeName}
          onChange={handleChange}
          label={t("TransferDataProcessingCreateForm.mpfTrusteeName.label")}
          placeholder={t("FormInput.pleaseSelect")}
          error={isErrors.mpfTrusteeName}
          helperText={helperTexts.mpfTrusteeName}
          required={true}
        >
          {trusteeOptions.map((op) => (
            <FormSelectOption key={op.value} value={op.name}>
              {op.name}
            </FormSelectOption>
          ))}
        </FormSelect>
        <FormSelect
          data-testid="mpfSchemeUuid"
          id="mpfSchemeUuid"
          name="mpfSchemeUuid"
          className="col-span-6"
          value={values.mpfSchemeUuid}
          onChange={handleChange}
          label={t("TransferDataProcessingCreateForm.mpfSchemeUuid.label")}
          placeholder={t("FormInput.pleaseSelect")}
          error={isErrors.mpfSchemeUuid}
          helperText={helperTexts.mpfSchemeUuid}
          required={true}
        >
          {schemeOptions
            .filter(
              (op) =>
                trusteeOptions.find((e) => e.value === op.trusteeId)?.name ===
                values.mpfTrusteeName
            )
            .map((op) => (
              <FormSelectOption key={op.uuid} value={op.uuid}>
                {op.name}
              </FormSelectOption>
            ))}
        </FormSelect>
        {values.transferType === "MMB_SCHEME_TRAN" ||
        values.transferType === "MMB_INTRA_GROUP" ? (
          <>
            <FormInput
              data-testid="mpfMpfEmployerName"
              className="col-span-3"
              name="mpfMpfEmployerName"
              label={t(
                "TransferDataProcessingCreateForm.mpfMpfEmployerName.label"
              )}
              onChange={handleChange}
              value={values.mpfMpfEmployerName}
              error={isErrors.mpfMpfEmployerName}
              helperText={helperTexts.mpfMpfEmployerName}
              required={true}
            />
            <FormInput
              data-testid="mpfMpfEmployerAccountNumber"
              className="col-span-3"
              name="mpfMpfEmployerAccountNumber"
              label={t(
                "TransferDataProcessingCreateForm.mpfMpfEmployerAccountNumber.label"
              )}
              onChange={handleChange}
              value={values.mpfMpfEmployerAccountNumber}
              error={isErrors.mpfMpfEmployerAccountNumber}
              helperText={helperTexts.mpfMpfEmployerAccountNumber}
              required={true}
            />
            <FormInput
              data-testid="mpfPayrollGroupCode"
              className="col-span-3"
              name="mpfPayrollGroupCode"
              label={t(
                "TransferDataProcessingCreateForm.mpfPayrollGroupCode.label"
              )}
              onChange={handleChange}
              value={values.mpfPayrollGroupCode}
              error={isErrors.mpfPayrollGroupCode}
              helperText={helperTexts.mpfPayrollGroupCode}
              required={true}
            />
          </>
        ) : null}
      </fieldset>
    </Accordion>
  );
};

export default NewMPFSchemeSection;
