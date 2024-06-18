import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Formik, FormikProps } from "formik";
import FormDatePicker from "frontend-common/src/components/FormDatePicker";
import FormInput from "frontend-common/src/components/FormInput";
import FormSelect, {
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";

import FormikPersistStateSetter from "../FormikPersistStateSetter";

import { TransferEnquiryTransferTypeOption } from "./model";
import {
  TransferEnquiryCaseSearchFormInitialValues,
  TransferEnquiryCaseSearchFormModel,
  TransferEnquiryCaseSearchFormSchema,
} from "./TransferEnquiryCaseSearchFormModel";

interface TransferEnquiryCaseSearchFormChildrenProps {
  transferTypeOptions: TransferEnquiryTransferTypeOption[];
  formikProps: FormikProps<TransferEnquiryCaseSearchFormModel>;
}

const TransferEnquiryCaseSearchFormChildren = (
  props: TransferEnquiryCaseSearchFormChildrenProps
): ReactElement => {
  const { transferTypeOptions, formikProps } = props;
  const {
    handleSubmit,
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleReset,
    dirty,
  } = formikProps;

  const { t } = useTranslation();

  const { isErrors, helperTexts } =
    useFormikErrorsWithModel<TransferEnquiryCaseSearchFormModel>({
      errors,
      touched,
      defaultHelperTexts: {
        submissionDtRange: t(
          "TransferEnquiryCase.form.submissionDtRange.helperText"
        ),
        effectiveDtRange: t(
          "TransferEnquiryCase.form.effectiveDtRange.helperText"
        ),
      },
    });

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <FormDatePicker
          id="submissionDtRange"
          name="submissionDtRange"
          data-testid="submissionDtRange"
          label={t("TransferEnquiryCase.form.submissionDtRange")}
          type="range"
          startDate={values.submissionDtRange[0]}
          endDate={values.submissionDtRange[1]}
          onBlur={handleBlur}
          error={isErrors.submissionDtRange}
          helperText={helperTexts.submissionDtRange}
          onChange={setFieldValue}
        />
        <FormSelect
          id="transferType"
          name="transferType"
          data-testid="transferType"
          variant="standard"
          fullWidth={true}
          label={t("TransferEnquiryCase.form.transferType")}
          value={values.transferType}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.transferType}
          helperText={helperTexts.transferType}
        >
          {transferTypeOptions.map((e) => (
            <FormSelectOption key={e.labelCode} value={e.labelCode}>
              {e.labelEn}
            </FormSelectOption>
          ))}
        </FormSelect>
        <FormDatePicker
          id="effectiveDtRange"
          name="effectiveDtRange"
          data-testid="effectiveDtRange"
          label={t("TransferEnquiryCase.form.effectiveDtRange")}
          type="range"
          startDate={values.effectiveDtRange[0]}
          endDate={values.effectiveDtRange[1]}
          onBlur={handleBlur}
          error={isErrors.effectiveDtRange}
          helperText={helperTexts.effectiveDtRange}
          onChange={setFieldValue}
        />
        <FormInput
          fullWidth={true}
          id="refNo"
          data-testid="refNo"
          name="refNo"
          label={t("TransferEnquiryCase.form.refNo")}
          type="text"
          value={values.refNo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.refNo}
          helperText={helperTexts.refNo}
        />
      </div>
      <div className="mt-5 flex justify-end gap-4">
        <Button
          id="clear-button"
          type="reset"
          className="rounded-full border-2 border-solid border-primary-main bg-common-white px-8 py-1 text-primary-main"
        >
          <Trans i18nKey="TransferEnquiryCase.form.clear" />
        </Button>
        <Button
          id="submit-button"
          data-testid="submit-button"
          type="submit"
          className="rounded-full border-2 border-solid border-secondary-main bg-common-white px-8 py-1 text-secondary-main disabled:border-gray-main disabled:text-gray-main"
          disabled={!dirty}
        >
          <Trans i18nKey="TransferEnquiryCase.form.search" />
        </Button>
      </div>
    </form>
  );
};

interface TransferEnquiryCaseSearchFormProps {
  transferTypeOptions: TransferEnquiryTransferTypeOption[];
  onSubmit: (values: TransferEnquiryCaseSearchFormModel) => void;
  onReset: (values: TransferEnquiryCaseSearchFormModel) => void;
  searchFormParamsValue: TransferEnquiryCaseSearchFormModel | null;
}

const TransferEnquiryCaseSearchForm = (
  props: TransferEnquiryCaseSearchFormProps
): ReactElement => {
  const { transferTypeOptions, onSubmit, onReset, searchFormParamsValue } =
    props;
  return (
    <Formik
      initialValues={TransferEnquiryCaseSearchFormInitialValues}
      validationSchema={TransferEnquiryCaseSearchFormSchema}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {(formikProps) => (
        <>
          <TransferEnquiryCaseSearchFormChildren
            transferTypeOptions={transferTypeOptions}
            formikProps={formikProps}
          />
          {searchFormParamsValue ? (
            <FormikPersistStateSetter
              searchFormParams={searchFormParamsValue}
              {...formikProps}
            />
          ) : null}
        </>
      )}
    </Formik>
  );
};

export default TransferEnquiryCaseSearchForm;
