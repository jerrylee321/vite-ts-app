import React, { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FormikProps } from "formik";
import Accordion from "frontend-common/src/components/Accordion";
import FormDatePicker from "frontend-common/src/components/FormDatePicker";
import FormInput from "frontend-common/src/components/FormInput";
import HeadlineText from "frontend-common/src/components/HeadlineText";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";

import { CommonOption } from "../../models/option";
import { OrsoTrusteeItem } from "../../models/orsoTrusteeItem";
import FormSelect, {
  FormSelectOption,
  renderSelectCommonOption,
} from "../FormSelect";

import {
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormSchemeTransferModel,
} from "./TransferDataProcessingCreateFormModel";

interface OriginalORSOSchemeSectionProps {
  formikProps:
    | FormikProps<TransferCreateFormSchemeTransferModel>
    | FormikProps<TransferCreateFormIntraGroupTransferModel>
    | FormikProps<TransferCreateFormMmbTransferModel>;
  countryOptions: CommonOption[];
  districtOptions: CommonOption[];
  orsoTrusteeList: OrsoTrusteeItem[];
}

/**
 * @empfPortal trustee
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for original ORSO scheme information of "Transfer Data Processing - Create". It wraps the form components.
 * @empfProp formikProps
 * @empfProp trusteeOptions
 * @empfProp countryOptions
 * @empfProp districtOptions
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 *
 * @empfPortal orso
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for original ORSO scheme information of "Transfer Data Processing - Create". It wraps the form components.
 * @empfProp formikProps
 * @empfProp trusteeOptions
 * @empfProp countryOptions
 * @empfProp districtOptions
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 */
const OriginalORSOSchemeSection = (
  props: OriginalORSOSchemeSectionProps
): ReactElement => {
  const { formikProps, orsoTrusteeList, countryOptions, districtOptions } =
    props;
  const { values, handleChange, setFieldValue, errors, touched } = formikProps;
  const { t } = useTranslation();

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors,
    touched,
  });
  const { isErrors: addressIsErrors, helperTexts: addressHelperTexts } =
    useFormikErrorsWithModel({
      errors: errors.orsoTrusteeAddress ?? {},
      touched: touched.orsoTrusteeAddress ?? {},
    });

  return (
    <Accordion
      title={t(
        "TransferDataProcessingCreateForm.originalORSOSchemeSection.title"
      )}
    >
      <fieldset
        data-testid="OriginalORSOSchemeSection"
        className="m-0 grid grid-cols-12 gap-4 border-none p-0"
      >
        <FormSelect
          data-testid="orsoTrusteeId"
          id="orsoTrusteeId"
          name="orsoTrusteeId"
          className="col-span-6"
          value={values.orsoTrusteeId}
          onChange={handleChange}
          label={t("TransferDataProcessingCreateForm.orsoTrusteeId.label")}
          placeholder={t("FormInput.pleaseSelect")}
          error={isErrors.orsoTrusteeId}
          helperText={helperTexts.orsoTrusteeId}
          required={true}
        >
          {orsoTrusteeList.map((item) => (
            <FormSelectOption
              key={item.orsoTrusteeId}
              value={item.orsoTrusteeId}
            >
              {item.orsoTrusteeName}
            </FormSelectOption>
          ))}
        </FormSelect>
        <FormInput
          data-testid="orsoSchemeName"
          className="col-span-6"
          name="orsoSchemeName"
          label={t("TransferDataProcessingCreateForm.orsoSchemeName.label")}
          onChange={handleChange}
          value={values.orsoSchemeName}
          placeholder={t("FormInput.pleaseInput")}
          error={isErrors.orsoSchemeName}
          helperText={helperTexts.orsoSchemeName}
          required={true}
        />
        <FormInput
          data-testid="orsoTrusteeRegistrationNumber"
          className="col-span-3"
          name="orsoTrusteeRegistrationNumber"
          label={t(
            "TransferDataProcessingCreateForm.orsoTrusteeRegistrationNumber.label"
          )}
          onChange={handleChange}
          value={values.orsoTrusteeRegistrationNumber}
          placeholder={t("FormInput.pleaseInput")}
          error={isErrors.orsoTrusteeRegistrationNumber}
          helperText={helperTexts.orsoTrusteeRegistrationNumber}
          required={true}
        />
        <FormInput
          data-testid="orsoOrsoEmployerName"
          className="col-span-3"
          name="orsoOrsoEmployerName"
          label={t(
            "TransferDataProcessingCreateForm.orsoOrsoEmployerName.label"
          )}
          onChange={handleChange}
          value={values.orsoOrsoEmployerName}
          error={isErrors.orsoOrsoEmployerName}
          helperText={helperTexts.orsoOrsoEmployerName}
          required={true}
        />
        <FormInput
          data-testid="orsoOrsoEmployerAccountNumber"
          className="col-span-3"
          name="orsoOrsoEmployerAccountNumber"
          label={t(
            "TransferDataProcessingCreateForm.orsoOrsoEmployerAccountNumber.label"
          )}
          onChange={handleChange}
          value={values.orsoOrsoEmployerAccountNumber}
          error={isErrors.orsoOrsoEmployerAccountNumber}
          helperText={helperTexts.orsoOrsoEmployerAccountNumber}
          required={true}
        />
        {values.transferType === "MMB_SCHEME_TRAN" ||
        values.transferType === "MMB_INTRA_GROUP" ? (
          <FormDatePicker
            data-testid="orsoTrusteeEffectiveDateOfTransfer"
            name="orsoTrusteeEffectiveDateOfTransfer"
            className="col-span-3"
            label={t(
              "TransferDataProcessingCreateForm.orsoTrusteeEffectiveDateOfTransfer.label"
            )}
            onChange={setFieldValue}
            value={values.orsoTrusteeEffectiveDateOfTransfer}
            dateFormat="dd/MM/yyyy"
            error={isErrors.orsoTrusteeEffectiveDateOfTransfer}
            helperText={t(
              "TransferDataProcessingCreateForm.dateRange.helperText"
            )}
            required={true}
          />
        ) : null}
        <section className="col-span-12 mb-4 grid grid-cols-12 gap-4">
          <HeadlineText variant="h4" className="col-span-12 mb-2">
            <Trans i18nKey="TransferDataProcessingCreateForm.orsoTrusteeAddress.title" />
          </HeadlineText>
          <FormSelect
            data-testid="orsoTrusteeAddress.country"
            name="orsoTrusteeAddress.country"
            className="col-span-6"
            value={values.orsoTrusteeAddress.country}
            onChange={handleChange}
            label={t("TrusteeAddress.field.country")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.country}
            helperText={addressHelperTexts.country}
          >
            {countryOptions.map((it) => renderSelectCommonOption(it))}
          </FormSelect>

          <FormInput
            data-testid="orsoTrusteeAddress.city"
            name="orsoTrusteeAddress.city"
            className="col-span-6"
            value={values.orsoTrusteeAddress.city}
            onChange={handleChange}
            label={t("TrusteeAddress.field.city")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.city}
            helperText={addressHelperTexts.city}
          />
          <FormInput
            data-testid="orsoTrusteeAddress.room"
            name="orsoTrusteeAddress.room"
            className="col-span-3"
            value={values.orsoTrusteeAddress.room}
            onChange={handleChange}
            label={t("TrusteeAddress.field.room")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.room}
            helperText={addressHelperTexts.room}
          />
          <FormInput
            data-testid="orsoTrusteeAddress.floor"
            name="orsoTrusteeAddress.floor"
            className="col-span-3"
            value={values.orsoTrusteeAddress.floor}
            onChange={handleChange}
            label={t("TrusteeAddress.field.floor")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.floor}
            helperText={addressHelperTexts.floor}
          />
          <FormInput
            data-testid="orsoTrusteeAddress.block"
            name="orsoTrusteeAddress.block"
            className="col-span-3"
            value={values.orsoTrusteeAddress.block}
            onChange={handleChange}
            label={t("TrusteeAddress.field.block")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.block}
            helperText={addressHelperTexts.block}
          />
          <FormInput
            data-testid="orsoTrusteeAddress.building"
            name="orsoTrusteeAddress.building"
            className="col-span-6"
            value={values.orsoTrusteeAddress.building}
            onChange={handleChange}
            label={t("TrusteeAddress.field.building")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.building}
            helperText={addressHelperTexts.building}
          />
          <FormInput
            data-testid="orsoTrusteeAddress.street"
            name="orsoTrusteeAddress.street"
            className="col-span-6"
            value={values.orsoTrusteeAddress.street}
            onChange={handleChange}
            label={t("TrusteeAddress.field.street")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.street}
            helperText={addressHelperTexts.street}
          />
          <FormSelect
            data-testid="orsoTrusteeAddress.district"
            name="orsoTrusteeAddress.district"
            className="col-span-6"
            value={values.orsoTrusteeAddress.district}
            onChange={handleChange}
            label={t("TrusteeAddress.field.district")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.district}
            helperText={addressHelperTexts.district}
          >
            {districtOptions.map((it) => renderSelectCommonOption(it))}
          </FormSelect>
          <FormInput
            data-testid="orsoTrusteeAddress.postalCode"
            name="orsoTrusteeAddress.postalCode"
            className="col-span-6"
            value={values.orsoTrusteeAddress.postalCode}
            onChange={handleChange}
            label={t("TrusteeAddress.field.postalCode")}
            placeholder={t("FormInput.pleaseInput")}
            error={addressIsErrors.postalCode}
            helperText={addressHelperTexts.postalCode}
          />
        </section>
      </fieldset>
    </Accordion>
  );
};

export default OriginalORSOSchemeSection;
