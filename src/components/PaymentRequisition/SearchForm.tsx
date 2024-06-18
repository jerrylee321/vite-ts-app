import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import cn from "classnames";
import { Formik, FormikProps } from "formik";
import FormDatePicker from "frontend-common/src/components/FormDatePicker";
import FormInput from "frontend-common/src/components/FormInput";
import FormSelect, {
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";
import { CommonOption } from "frontend-common/src/models/option";
import { MuiButtonOverride } from "frontend-common/src/styles/MuiButtonOverride.module.scss";

import FormikPersistStateSetter from "../FormikPersistStateSetter";

import {
  searchFormInitialValues,
  SearchFormModel,
  SearchFormSchema,
} from "./SearchFormModel";

export const SearchFormChildren = (
  props: FormikProps<SearchFormModel> & {
    transferTypeOptions: CommonOption[];
    isSearchFilterEmpty: (values: SearchFormModel) => boolean;
  }
): ReactElement => {
  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    handleReset,
    transferTypeOptions,
    isSearchFilterEmpty,
  } = props;

  const { t } = useTranslation();

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors,
    touched,
  });

  const isSearchDisabled = useMemo(() => {
    return isSearchFilterEmpty(values);
  }, [isSearchFilterEmpty, values]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-12 gap-4"
      data-testid="paymentRequisitionSearchForm"
    >
      <FormInput
        fullWidth={true}
        id="billingRefNo"
        data-testid="billingRefNo"
        name="billingRefNo"
        className="col-span-3"
        label={t(
          "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.billlingRefNo.label"
        )}
        value={values.billingRefNo}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isErrors.billingRefNo}
        helperText={helperTexts.billingRefNo}
      />
      <FormSelect
        required={true}
        fullWidth={true}
        id="transferType"
        className="col-span-3"
        data-testid="transferType"
        name="transferType"
        label={t(
          "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.transferType.label"
        )}
        variant="standard"
        value={values.transferType}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isErrors.transferType}
        helperText={helperTexts.transferType}
      >
        {transferTypeOptions.map((transferTypeOption) => (
          <FormSelectOption
            key={transferTypeOption.key}
            value={transferTypeOption.key}
          >
            {transferTypeOption.name}
          </FormSelectOption>
        ))}
      </FormSelect>
      <FormInput
        fullWidth={true}
        id="submissionRefNo"
        data-testid="submissionRefNo"
        name="submissionRefNo"
        className="col-span-3"
        label={t(
          "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.submissionRefNo.label"
        )}
        value={values.submissionRefNo}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isErrors.submissionRefNo}
        helperText={helperTexts.submissionRefNo}
      />
      <FormDatePicker
        label={t(
          "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.paymentNotificationDateRange.label"
        )}
        className="col-span-3"
        type="range"
        name="paymentNotificationDateRange"
        data-testid="paymentNotificationDateRange"
        startDate={values.paymentNotificationDateRange[0]}
        endDate={values.paymentNotificationDateRange[1]}
        error={isErrors.paymentNotificationDateRange}
        helperText={t(
          "PaymentRequisitionScreen.HistoricalSection.searchForm.filter.paymentNotificationDateRange.helperText"
        )}
        onChange={setFieldValue}
        onBlur={handleBlur}
      />
      <div className="col-span-3 col-end-13 row-start-2 flex justify-end gap-4 uppercase">
        <Button
          type="reset"
          aria-label="Clear filter"
          className={cn(
            MuiButtonOverride,
            "text-error-main border-error-main col-span-3 row-start-2"
          )}
          data-testid="clearFilterBtn"
          variant="outlined"
          onClick={handleReset}
        >
          <Trans i18nKey="PaymentRequisitionScreen.HistoricalSection.searchForm.action.clear" />
        </Button>
        <Button
          aria-label="Search"
          type="submit"
          className={cn(
            MuiButtonOverride,
            "text-info-main border-info-main col-span-3 row-start-2 disabled:text-gray-main disabled:border-gray-main"
          )}
          disabled={isSearchDisabled}
          data-testid="searchBtn"
          variant="outlined"
        >
          <Trans i18nKey="PaymentRequisitionScreen.HistoricalSection.searchForm.action.search" />
        </Button>
      </div>
    </form>
  );
};

interface SearchFormProps {
  onSubmit: (values: SearchFormModel) => void;
  transferTypeOptions: CommonOption[];
  isSearchFilterEmpty: (values: SearchFormModel) => boolean;
  searchFormParamsValue: SearchFormModel;
}

export const SearchForm = (props: SearchFormProps): ReactElement => {
  const {
    transferTypeOptions,
    onSubmit,
    isSearchFilterEmpty,
    searchFormParamsValue,
  } = props;
  return (
    <Formik
      initialValues={searchFormInitialValues}
      validationSchema={SearchFormSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <>
          <SearchFormChildren
            {...formikProps}
            isSearchFilterEmpty={isSearchFilterEmpty}
            transferTypeOptions={transferTypeOptions}
          />
          <FormikPersistStateSetter
            {...formikProps}
            searchFormParams={searchFormParamsValue}
          />
        </>
      )}
    </Formik>
  );
};
