import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import DataTable from "frontend-common/src/components/DataTable";
import HeadlineText from "frontend-common/src/components/HeadlineText";
import { DataTableSectionStateProps } from "frontend-common/src/components/types";

import { PageData } from "../../models/datatable";

import {
  getSearchResultsColumns,
  PaymentRequisitionCaseViewModel,
} from "./getSearchResultsColumns";

interface CasesForYourActionSectionProps extends DataTableSectionStateProps {
  className?: string;
  isLoading: boolean;
  caseList: PaymentRequisitionCaseViewModel[];
  renderDetailPath: (id: string) => string;
  totalCount: number;
  pageData?: PageData;
}

const CasesForYourActionSection = (
  props: CasesForYourActionSectionProps
): ReactElement => {
  const {
    className,
    isLoading,
    caseList,
    renderDetailPath,
    tableState,
    onTableStateChange,
    totalCount,
    pageData,
  } = props;
  const { t } = useTranslation();

  const columns = useMemo(
    () => getSearchResultsColumns("CasesForYourAction", renderDetailPath),
    [renderDetailPath]
  );

  return (
    <Accordion
      title={t("PaymentRequisitionScreen.CasesForYourActionSection.title")}
      data-testid="CasesForYourAction"
      className={className}
    >
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={caseList}
        initState={tableState}
        onStateChange={onTableStateChange}
        emptyDataDisplayString={t(
          "PaymentRequisitionScreen.CasesForYourActionSection.table.noData.placeholder"
        )}
        manualPagination={true}
        manualSortBy={true}
        pageData={pageData}
        reactKeyFieldName="caseUuid"
      />
      <HeadlineText
        data-testid="casesForYourActionPaymentRequisitionsTotalCount"
        variant="h2"
      >
        <Trans
          i18nKey="PaymentRequisitionScreen.CasesForYourActionSection.result.total"
          values={{ total: totalCount }}
        />
      </HeadlineText>
    </Accordion>
  );
};

export default CasesForYourActionSection;
