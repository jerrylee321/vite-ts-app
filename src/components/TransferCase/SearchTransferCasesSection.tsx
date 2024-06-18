import React, { ReactElement, useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Divider, Typography } from "@mui/material";
import cn from "classnames";
import { Formik } from "formik";
import Accordion from "frontend-common/src/components/Accordion";
import DataTable from "frontend-common/src/components/DataTable";
import { MuiDividerOverride } from "frontend-common/src/styles/MuiDividerOverride.module.scss";

import useSearchParamsValue from "../../hooks/useSearchParamsValue";
import { PageData } from "../../models/datatable";
import FormikPersistStateSetter from "../FormikPersistStateSetter";
import { DataTableSectionStateProps } from "../types";

import getTransferCaseColumns, {
  TransferCaseActionViewButtonProps,
} from "./getTransferCaseColumns";
import { TransferCase } from "./models";
import TransferCaseSearchForm from "./TransferCaseSearchForm";
import {
  TransferCaseSearchFormInitialValue,
  TransferCaseSearchFormModel,
  TransferCaseSearchFormSchema,
} from "./TransferCaseSearchFormModel";

interface SearchTransferCasesSectionProps extends DataTableSectionStateProps {
  onSearchParamsChange: (searchParams: TransferCaseSearchFormModel) => void;
  isLoading: boolean;
  transferCases: TransferCase[];
  pageData?: PageData;
  getViewButtonProps: (
    transferCase: TransferCase
  ) => TransferCaseActionViewButtonProps;
}

/**
 * @empfPortal trustee
 * @empfScreenID A1, A12, A16, A17
 * @empfComponent
 * @empfDesc It is a section component for search transfer case of "Transfer Data Processing - Summary". It wraps the form and data table components.
 * @empfProp onSearchParamsChange
 * @empfProp isLoading
 * @empfProp transferCases
 * @empfProp pageData
 * @empfProp getViewButtonProps
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 *
 * @empfPortal orso
 * @empfScreenID A1, A12, A16, A17
 * @empfComponent
 * @empfDesc It is a section component for search transfer case of "Transfer Data Processing - Summary". It wraps the form and data table components.
 * @empfProp onSearchParamsChange
 * @empfProp isLoading
 * @empfProp transferCases
 * @empfProp pageData
 * @empfProp getViewButtonProps
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 */
const SearchTransferCasesSection = (
  props: SearchTransferCasesSectionProps
): ReactElement => {
  const {
    onSearchParamsChange,
    isLoading,
    transferCases,
    getViewButtonProps,
    tableState,
    onTableStateChange,
    pageData,
  } = props;
  const { t } = useTranslation();

  const [searchFormParamsValue, setSearchFormParamsValue] =
    useSearchParamsValue<TransferCaseSearchFormModel>({
      key: "historical_form",
      initValue: TransferCaseSearchFormInitialValue,
    });

  const onSubmitForm = useCallback(
    (values: TransferCaseSearchFormModel) => {
      setSearchFormParamsValue(values);
      onSearchParamsChange(values);
    },
    [onSearchParamsChange, setSearchFormParamsValue]
  );

  const onResetForm = useCallback(
    (values: TransferCaseSearchFormModel) => {
      setSearchFormParamsValue(values);
      onSearchParamsChange(values);
    },
    [onSearchParamsChange, setSearchFormParamsValue]
  );

  const columns = useMemo(
    () => getTransferCaseColumns("iconButton", getViewButtonProps),
    [getViewButtonProps]
  );

  return (
    <Accordion title={t("TransferCase.searchSection.title")}>
      <Formik
        initialValues={TransferCaseSearchFormInitialValue}
        validationSchema={TransferCaseSearchFormSchema}
        onSubmit={onSubmitForm}
        onReset={onResetForm}
      >
        {(formikProps) => (
          <>
            <TransferCaseSearchForm formikProps={formikProps} />
            <FormikPersistStateSetter
              {...formikProps}
              searchFormParams={searchFormParamsValue}
            />
          </>
        )}
      </Formik>
      <Divider className={cn(MuiDividerOverride, "mt-4 mb-6")} />
      <Typography variant="h5" className="font-bold text-primary-main">
        <Trans i18nKey="TransferCase.searchSection.searchResultsTitle" />
      </Typography>
      <DataTable
        isLoading={isLoading}
        data-testid="SearchTransferCasesDataTable"
        columns={columns}
        data={transferCases}
        initState={tableState}
        onStateChange={onTableStateChange}
        manualPagination={true}
        manualSortBy={true}
        pageData={pageData}
        reactKeyFieldName="caseUuid"
      />
    </Accordion>
  );
};

export default SearchTransferCasesSection;
