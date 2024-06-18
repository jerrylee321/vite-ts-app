import { ReactElement } from "react";
import { CellProps, Column } from "react-table";

import { transferTypeMessageIdMap } from "../../models/transferType";
import dateTimeSorting from "../../react-table/dateTimeSorting";
import { ViewIconLinkActionButton } from "../ViewIconLinkActionCell";
import { ViewTextLinkActionButton } from "../ViewTextLinkActionCell";

import { TransferCase } from "./models";

export interface TransferCaseActionViewButtonProps {
  targetPath: string;
  hasViewAccess: boolean;
}

function getTransferCaseColumns(
  viewButtonVariant: "textButton" | "iconButton",
  getViewButtonProps: (
    transferCase: TransferCase
  ) => TransferCaseActionViewButtonProps
): Column<TransferCase>[] {
  return [
    {
      i18nKey: "TransferCase.transferCaseTable.header.submissionDate",
      accessor: "submissionDt",
      dateFormat: "dd/MM/yyyy",
      sortType: dateTimeSorting,
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.transferType",
      accessor: "transferType",
      i18nValueMap: transferTypeMessageIdMap,
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.referenceNumber",
      accessor: "refNo",
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.nameOfOrsoScheme",
      accessor: "orsoSchemeName",
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.nameOfMpfScheme",
      accessor: "mpfSchemeName",
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.transferEffectiveDate",
      accessor: "trfEffectiveDt",
      dateFormat: "dd/MM/yyyy",
      sortType: dateTimeSorting,
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.numberOfMember",
      id: "numMember",
      accessor: (data) => data.numMember?.toString(),
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.status",
      accessor: "status",
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.preparerUserId",
      accessor: "prepareName",
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.supervisorUserId",
      accessor: "supervisorName",
    },
    {
      i18nKey: "TransferCase.transferCaseTable.header.action",
      id: "action",
      accessor: "caseUuid",
      Cell: ({ row }: CellProps<TransferCase, string | null>): ReactElement => {
        const { targetPath, hasViewAccess } = getViewButtonProps(row.original);
        return viewButtonVariant === "textButton" ? (
          <ViewTextLinkActionButton
            to={targetPath}
            disabled={!hasViewAccess}
            data-testid="TransferCasesDataTableViewButton"
          />
        ) : (
          <ViewIconLinkActionButton
            data-testid="TransferCasesDataTableViewIconButton"
            to={targetPath}
            disabled={!hasViewAccess}
          />
        );
      },
    },
  ];
}

export default getTransferCaseColumns;
