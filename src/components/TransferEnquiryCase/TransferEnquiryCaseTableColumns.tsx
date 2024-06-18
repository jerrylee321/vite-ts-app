import { ReactElement } from "react";
import { CellProps, Column } from "react-table";
import { ReactComponent as ViewIcon } from "frontend-common/src/assets/icons/view.svg";
import SvgIconButton from "frontend-common/src/components/SvgIconButton";
import dateTimeSorting from "frontend-common/src/react-table/dateTimeSorting";

import { TransferEnquiryCase } from "./model";

const makeTransferEnquiryCaseTableColumns = (
  transferTypeMap: Map<string, string>,
  renderDetailScreenPath: (caseId: string) => string
): Column<TransferEnquiryCase>[] => {
  return [
    {
      i18nKey: "TransferEnquiryCase.table.header.submissionDt",
      dateFormat: "dd/MM/yyyy",
      accessor: "submissionDt",
      sortType: dateTimeSorting,
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.transferType",
      id: "transferType",
      accessor: (data) => {
        return data.transferType
          ? transferTypeMap.get(data.transferType) ?? data.transferType
          : null;
      },
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.refNo",
      accessor: "refNo",
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.orsoSchemeName",
      accessor: "orsoSchemeName",
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.mpfSchemeName",
      accessor: "mpfSchemeName",
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.trfEffectiveDt",
      dateFormat: "dd/MM/yyyy",
      accessor: "effDt",
      sortType: dateTimeSorting,
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.numMember",
      accessor: "numMember",
    },
    {
      i18nKey: "TransferEnquiryCase.table.header.action",
      id: "action",
      accessor: "caseUuid",
      Cell: ({
        value: caseId,
      }: CellProps<TransferEnquiryCase, string>): ReactElement => {
        return (
          <SvgIconButton
            type="Link"
            data-testid="TransferCasesDataTableViewIconButton"
            className="hover:from-black/[0] hover:to-black/[0] active:from-black/[0] active:to-black/[0]"
            to={renderDetailScreenPath(caseId)}
            Icon={ViewIcon}
          />
        );
      },
    },
  ];
};

export default makeTransferEnquiryCaseTableColumns;
