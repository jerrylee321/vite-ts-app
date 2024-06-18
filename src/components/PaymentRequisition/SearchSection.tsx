import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import cn from "classnames";
import Accordion from "frontend-common/src/components/Accordion";
import DataTable from "frontend-common/src/components/DataTable";
import HeadlineText from "frontend-common/src/components/HeadlineText";
import { CommonOption } from "frontend-common/src/models/option";
import { MuiDividerOverride } from "frontend-common/src/styles/MuiDividerOverride.module.scss";

import { PageData } from "../../models/datatable";
import { DataTableSectionStateProps } from "../types";

import {
  getSearchResultsColumns,
  PaymentRequisitionCaseViewModel,
} from "./getSearchResultsColumns";
import { SearchForm } from "./SearchForm";
import { SearchFormModel } from "./SearchFormModel";

interface SearchSectionProps extends DataTableSectionStateProps {
  className?: string;
  isLoading: boolean;
  caseList: PaymentRequisitionCaseViewModel[];
  onSubmit: (values: SearchFormModel) => void;
  renderDetailPath: (id: string) => string;
  isSearchFilterEmpty: (values: SearchFormModel) => boolean;
  transferTypeOptions: CommonOption[];
  searchFormParamsValue: SearchFormModel;
  pageData?: PageData;
}

const SearchSection = (props: SearchSectionProps): ReactElement => {
  const {
    className,
    isLoading,
    caseList,
    onSubmit,
    renderDetailPath,
    isSearchFilterEmpty,
    transferTypeOptions,
    searchFormParamsValue,
    tableState,
    onTableStateChange,
    pageData,
  } = props;
  const { t } = useTranslation();

  const columns = useMemo(
    () => getSearchResultsColumns("Others", renderDetailPath),
    [renderDetailPath]
  );

  return (
    <Accordion
      title={t("PaymentRequisitionScreen.HistoricalSection.searchForm.title")}
      data-testid="Search"
      className={className}
    >
      <SearchForm
        onSubmit={onSubmit}
        transferTypeOptions={transferTypeOptions}
        isSearchFilterEmpty={isSearchFilterEmpty}
        searchFormParamsValue={searchFormParamsValue}
      />
      <Divider className={cn(MuiDividerOverride, "my-4")} />
      <div className="py-6">
        <HeadlineText variant="h3" className="text-primary-main">
          <Trans i18nKey="PaymentRequisitionScreen.HistoricalSection.result.title" />
        </HeadlineText>
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={caseList}
          initState={tableState}
          onStateChange={onTableStateChange}
          manualPagination={true}
          manualSortBy={true}
          pageData={pageData}
          reactKeyFieldName="caseUuid"
        />
      </div>
    </Accordion>
  );
};

export default SearchSection;
