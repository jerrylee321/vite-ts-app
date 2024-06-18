import React, { ReactElement, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import cn from "classnames";
import { FormikProps } from "formik";
import FormDatePicker from "frontend-common/src/components/FormDatePicker";
import FormInput from "frontend-common/src/components/FormInput";
import FormSelect, {
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";
import { MessageKey } from "frontend-common/src/i18n/LocaleModel";
import { MuiButtonOverride } from "frontend-common/src/styles/MuiButtonOverride.module.scss";

import { TransferCaseSearchFormModel } from "./TransferCaseSearchFormModel";

const allTransferType = ["MMB_SCHEME_TRAN", "MMB_INTRA_GROUP", "MMB"] as const;
const transferTypeMessageIdMap: Record<
  (typeof allTransferType)[number],
  MessageKey
> = {
  MMB_SCHEME_TRAN: "TransferCase.transferType.schemeTransfer",
  MMB_INTRA_GROUP: "TransferCase.transferType.intraGroupTransfer",
  MMB: "TransferCase.transferType.mmbTransfer",
};

interface TransferCaseSearchFormProps {
  formikProps: FormikProps<TransferCaseSearchFormModel>;
}
const TransferCaseSearchForm = (
  props: TransferCaseSearchFormProps
): ReactElement => {
  const { formikProps } = props;
  const {
    handleSubmit,
    handleBlur,
    values,
    handleChange,
    setFieldValue,
    touched,
    errors,
    resetForm,
  } = formikProps;

  const onClickReset = useCallback(() => resetForm(), [resetForm]);

  const { t } = useTranslation();

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors,
    touched,
  });

  const transferTypeOptions = useMemo(() => {
    return allTransferType.map((transferType) => ({
      value: transferType,
      name: t(transferTypeMessageIdMap[transferType]),
    }));
  }, [t]);

  return (
    <form
      data-testid="TransferCaseSearchForm"
      onSubmit={handleSubmit}
      className="grid grid-cols-12 gap-4"
    >
      <FormDatePicker
        label={t("TransferCase.searchSection.filter.submissionDateRange")}
        className="col-span-3"
        data-testid="submissionDateRangeDatePicker"
        name="submissionDateRange"
        type="range"
        helperText={t("TransferCase.searchSection.filter.dateRange.helperText")}
        startDate={values.submissionDateRange[0]}
        endDate={values.submissionDateRange[1]}
        error={isErrors.submissionDateRange}
        onChange={setFieldValue}
        onBlur={handleBlur}
      />
      <FormSelect
        className="col-span-3"
        id="transferTypeInput"
        data-testid="transferTypeInput"
        name="transferType"
        fullWidth={true}
        label={t("TransferCase.searchSection.filter.transferType")}
        value={values.transferType}
        error={isErrors.transferType}
        helperText={helperTexts.transferType}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {transferTypeOptions.map(({ name, value }) => (
          <FormSelectOption key={value} value={value}>
            {name}
          </FormSelectOption>
        ))}
      </FormSelect>
      <FormDatePicker
        label={t(
          "TransferCase.searchSection.filter.transferEffectiveDateRange"
        )}
        className="col-span-3"
        data-testid="transferEffectiveDateRangeDatePicker"
        name="transferEffectiveDateRange"
        type="range"
        helperText={t("TransferCase.searchSection.filter.dateRange.helperText")}
        startDate={values.transferEffectiveDateRange[0]}
        endDate={values.transferEffectiveDateRange[1]}
        error={isErrors.transferEffectiveDateRange}
        onChange={setFieldValue}
        onBlur={handleBlur}
      />
      <FormInput
        name="referenceNumber"
        data-testid="referenceNumberInput"
        className="col-span-3"
        label={t("TransferCase.searchSection.filter.referenceNumber")}
        type="text"
        placeholder={t("FormInput.pleaseInput")}
        value={values.referenceNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="col-span-3 col-end-13 row-start-2 flex justify-end gap-4 uppercase">
        <Button
          data-testid="clearFilterBtn"
          type="reset"
          variant="outlined"
          className={cn(
            MuiButtonOverride,
            "text-error-main border-error-main col-span-3 row-start-2"
          )}
          aria-label="Clear filter"
          onClick={onClickReset}
        >
          {t("TransferCase.searchSection.action.clear")}
        </Button>
        <Button
          data-testid="searchBtn"
          variant="outlined"
          type="submit"
          className={cn(
            MuiButtonOverride,
            "text-info-main border-info-main col-span-3 row-start-2 disabled:text-gray-main disabled:border-gray-main"
          )}
          aria-label="Search"
        >
          {t("TransferCase.searchSection.action.search")}
        </Button>
      </div>
    </form>
  );
};

export default TransferCaseSearchForm;
