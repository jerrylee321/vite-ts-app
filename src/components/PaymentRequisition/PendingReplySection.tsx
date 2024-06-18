import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import DataTable from "frontend-common/src/components/DataTable";
import HeadlineText from "frontend-common/src/components/HeadlineText";

import { PageData } from "../../models/datatable";
import { DataTableSectionStateProps } from "../types";

import {
  getSearchResultsColumns,
  PaymentRequisitionCaseViewModel,
} from "./getSearchResultsColumns";

interface PendingReplySectionProps extends DataTableSectionStateProps {
  className?: string;
  isLoading: boolean;
  caseList: PaymentRequisitionCaseViewModel[];
  renderDetailPath: (id: string) => string;
  totalCount: number;
  pageData?: PageData;
}

const PendingReplySection = (props: PendingReplySectionProps): ReactElement => {
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
    () => getSearchResultsColumns("Others", renderDetailPath),
    [renderDetailPath]
  );

  return (
    <Accordion
      title={t("PaymentRequisitionScreen.PendingReplySection.title")}
      data-testid="PendingReply"
      className={className}
    >
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
      <HeadlineText
        data-testid="pendingReplyPaymentRequisitionsTotalCount"
        variant="h2"
      >
        <Trans
          i18nKey="PaymentRequisitionScreen.PendingReplySection.result.total"
          values={{ total: totalCount }}
        />
      </HeadlineText>
    </Accordion>
  );
};

export default PendingReplySection;
