import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import { DataTableSectionStateProps } from "../../components/types";
import { PageData } from "../../models/datatable";
import { SelectedItem } from "../../utils/datatable";
import Accordion from "../Accordion";
import DataTable from "../DataTable";

import getTransferCaseColumns, {
  TransferCaseActionViewButtonProps,
} from "./getTransferCaseColumns";
import { TransferCase } from "./models";

interface TransferCasesSectionCommonProps extends DataTableSectionStateProps {
  className?: string;
  variant: "casesForYourAction" | "pendingReply";
  isLoading: boolean;
  transferCases: TransferCase[];
  totalCount: number;
  pageData?: PageData;
  getViewButtonProps: (
    transferCase: TransferCase
  ) => TransferCaseActionViewButtonProps;
}

interface TransferCasesActionSectionProps
  extends TransferCasesSectionCommonProps {
  variant: "casesForYourAction";
  onDeleteItemsRequest: (data: SelectedItem<TransferCase>[]) => void;
}

interface TransferCasesPendingSectionProps
  extends TransferCasesSectionCommonProps {
  variant: "pendingReply";
  onDeleteItemsRequest?: undefined;
}
/**
 * @empfPortal trustee
 * @empfScreenID A1, A12, A16, A17
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 * @empfComponent
 * @empfDesc It is a section component for transfer case of "Transfer Data Processing - Summary". It wraps the data table components.
 * @empfProp variant
 * @empfProp isLoading
 * @empfProp transferCases
 * @empfProp totalCount
 * @empfProp pageData
 * @empfProp getViewButtonProps
 *
 * @empfPortal orso
 * @empfScreenID A1, A12, A16, A17
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 * @empfComponent
 * @empfDesc It is a section component for transfer case of "Transfer Data Processing - Summary". It wraps the data table components.
 * @empfProp variant
 * @empfProp isLoading
 * @empfProp transferCases
 * @empfProp totalCount
 * @empfProp pageData
 * @empfProp getViewButtonProps
 */
const TransferCasesSection = (
  props: TransferCasesActionSectionProps | TransferCasesPendingSectionProps
): ReactElement => {
  const {
    className,
    variant,
    isLoading,
    transferCases,
    totalCount,
    getViewButtonProps,
    onDeleteItemsRequest,
    tableState,
    onTableStateChange,
    pageData,
  } = props;
  const { t } = useTranslation();

  const viewButtonVariant =
    variant === "casesForYourAction" ? "textButton" : "iconButton";

  const columns = useMemo(
    () => getTransferCaseColumns(viewButtonVariant, getViewButtonProps),
    [getViewButtonProps, viewButtonVariant]
  );

  return (
    <>
      <Accordion
        title={
          variant === "casesForYourAction"
            ? t("TransferCase.casesForYourActionSection.title")
            : t("TransferCase.pendingReplySection.title")
        }
        className={className}
        footer={
          <Typography
            data-testid="totalCount"
            variant="h6"
            className="text-2xl font-black text-primary-main"
          >
            <Trans
              i18nKey="TransferCase.transferCasesSection.total"
              values={{ total: totalCount }}
            />
          </Typography>
        }
      >
        <DataTable
          isLoading={isLoading}
          data-testid={`TransferCasesDataTable.${variant}`}
          columns={columns}
          data={transferCases}
          initState={tableState}
          onStateChange={onTableStateChange}
          emptyDataDisplayString={t(
            "TransferCase.casesForYourActionSection.table.noData.placeholder"
          )}
          isDeleteEnabled={variant === "casesForYourAction"}
          onDeleteItems={onDeleteItemsRequest}
          manualPagination={true}
          manualSortBy={true}
          pageData={pageData}
          reactKeyFieldName="caseUuid"
        />
      </Accordion>
    </>
  );
};

export default TransferCasesSection;
