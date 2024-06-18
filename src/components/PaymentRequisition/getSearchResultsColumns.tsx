import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CellProps, Column } from "react-table";
import { ReactComponent as ViewIcon } from "frontend-common/src/assets/icons/view.svg";
import DataTableActionLink from "frontend-common/src/components/DataTableActionLink";
import SvgIconButton from "frontend-common/src/components/SvgIconButton";
import dateTimeSorting from "frontend-common/src/react-table/dateTimeSorting";

export type ActionVariant = "CasesForYourAction" | "Others";

export interface PaymentRequisitionCaseViewModel {
  payNotificationDt: Date | null;
  billRefNo: string | null;
  transferType: string | null;
  refNo: string | null;
  orsoSchemeName: string | null;
  mpfSchemeName: string | null;
  numMember: number | null;
  status: string | null;
  prepareName: string | null;
  supervisorName: string | null;
  caseUuid: string;
}

export const getSearchResultsColumns = (
  variant: ActionVariant,
  renderDetailPath: (id: string) => string
): Column<PaymentRequisitionCaseViewModel>[] => [
  {
    i18nKey: "PaymentRequisitionScreen.table.header.paymentNotificationDate",
    id: "paymentNotificationDate",
    accessor: "payNotificationDt",
    sortType: dateTimeSorting,
    dateFormat: "dd/MM/yyyy",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.billingRefNo",
    id: "billingRefNo",
    accessor: "billRefNo",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.transferType",
    id: "transferType",
    accessor: "transferType",
    i18nValueMap: {
      MMB_SCHEME_TRAN: "PaymentRequisitionScreen.typeOfTransfer.SchemeTransfer",
      MMB_INTRA_GROUP:
        "PaymentRequisitionScreen.typeOfTransfer.IntraGroupTransfer",
      MMB: "PaymentRequisitionScreen.typeOfTransfer.MmbTransfer",
    },
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.refNo",
    id: "refNo",
    accessor: "refNo",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.orsoSchemeName",
    id: "orsoSchemeName",
    accessor: "orsoSchemeName",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.mpfSchemeName",
    id: "mpfSchemeName",
    accessor: "mpfSchemeName",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.memberNumber",
    id: "memberNumber",
    accessor: "numMember",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.status",
    id: "status",
    accessor: "status",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.preparerUsername",
    id: "preparerUsername",
    accessor: "prepareName",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.supervisorUsername",
    id: "supervisorUserId",
    accessor: "supervisorName",
  },
  {
    i18nKey: "PaymentRequisitionScreen.table.header.action",
    accessor: "caseUuid",
    Cell: ({
      value: caseUuid,
      row,
    }: CellProps<PaymentRequisitionCaseViewModel, string>): ReactElement => {
      const { t } = useTranslation();

      const detailPath = useMemo(() => renderDetailPath(caseUuid), [caseUuid]);

      if (variant === "CasesForYourAction") {
        return (
          <DataTableActionLink
            disabled={row.original.status === "Pending Virus Scan"}
            to={detailPath}
            aria-label={t(
              "PaymentRequisitionScreen.table.header.action.view.label"
            )}
            message={t("PaymentRequisitionScreen.table.header.action.view")}
          />
        );
      }

      return (
        <SvgIconButton
          type="Link"
          aria-label={t(
            "PaymentRequisitionScreen.table.header.action.view.label"
          )}
          className="hover:from-black/[0] hover:to-black/[0] active:from-black/[0] active:to-black/[0]"
          to={detailPath}
          Icon={ViewIcon}
        />
      );
    },
    id: "action",
    disableSortBy: true,
  },
];
