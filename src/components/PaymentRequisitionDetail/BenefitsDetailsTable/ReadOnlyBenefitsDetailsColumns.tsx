import { ReactElement, useMemo } from "react";
import Highlighter from "react-highlight-words";
import { Trans, useTranslation } from "react-i18next";
import { CellProps, Column, FooterProps } from "react-table";

import { TransferType } from "../PaymentRequisitionContents";

export interface CommonBenefitsDetailsViewModel {
  transferType: TransferType;
  surnameZh: string | null;
  givenNameZh: string | null;
  surnameEn: string | null;
  givenNameEn: string | null;
  idType: string | null;
  idNo: string | null;
}

export interface SchemeTransferBenefitsDetailsViewModel
  extends CommonBenefitsDetailsViewModel {
  newMemberFlg: boolean;
  eeBenfPreMpf: number;
  eeBenfPostMpf: number;
  erBenfPreMpf: number;
  erBenfPostMpf: number;
  eeBenfOrso: number;
  erBenfOrso: number;
  eeBenfMmb: number;
  erBenfMmb: number;
}

export type IntraGroupTransferBenefitsDetailsViewModel =
  SchemeTransferBenefitsDetailsViewModel;

export interface MmbTransferBenefitsDetailsViewModel
  extends CommonBenefitsDetailsViewModel {
  mmbAmount: number;
}

export type BenefitsDetailsViewModel =
  | SchemeTransferBenefitsDetailsViewModel
  | IntraGroupTransferBenefitsDetailsViewModel
  | MmbTransferBenefitsDetailsViewModel;

export const TransferTypeCell = <T extends object>({
  value: transferType,
  state,
}: CellProps<T, TransferType>): ReactElement => {
  const { t } = useTranslation();

  return (
    <Highlighter
      highlightClassName="highlight"
      searchWords={[state.globalFilter]}
      autoEscape={true}
      textToHighlight={t(
        `PaymentRequisitionDetailScreen.typeOfTransfer.${transferType}`
      )}
    />
  );
};

export const SchemeOrIntraGroupTransferBenefitsDetailsColumns: Column<
  | SchemeTransferBenefitsDetailsViewModel
  | IntraGroupTransferBenefitsDetailsViewModel
>[] = [
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.typeOfTransfer",
    id: "transferType",
    accessor: "transferType",
    Cell: TransferTypeCell<
      | SchemeTransferBenefitsDetailsViewModel
      | IntraGroupTransferBenefitsDetailsViewModel
    >,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.surnameZh",
    id: "surnameZh",
    accessor: "surnameZh",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.givenNameZh",
    id: "givenNameZh",
    accessor: "givenNameZh",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.surnameEn",
    id: "surnameEn",
    accessor: "surnameEn",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.givenNameEn",
    id: "givenNameEn",
    accessor: "givenNameEn",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdType",
    id: "idType",
    accessor: "idType",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdNo",
    id: "idNo",
    accessor: "idNo",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.newOrExistingMember",
    id: "newOrExistingMember",
    accessor: "newMemberFlg",
    i18nValueMap: {
      true: "PaymentRequisitionDetailScreen.benefitDetailsTable.newOrExistingMember.new",
      false:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.newOrExistingMember.existing",
    },
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.preMpfServiceEeBenefits",
    id: "eeBenfPreMpf",
    accessor: "eeBenfPreMpf",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.postMpfServiceEeBenefits",
    id: "eeBenfPostMpf",
    accessor: "eeBenfPostMpf",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.preMpfServiceErBenefits",
    id: "erBenfPreMpf",
    accessor: "erBenfPreMpf",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.postMpfServiceErBenefits",
    id: "erBenfPostMpf",
    accessor: "erBenfPostMpf",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.orsoEmployerBenefits",
    id: "erBenfOrso",
    accessor: "erBenfOrso",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.orsoEmployeeBenefits",
    id: "eeBenfOrso",
    accessor: "eeBenfOrso",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.ErPortionMmbAmount",
    id: "erBenfMmb",
    accessor: "erBenfMmb",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.EePortionMmbAmount",
    id: "eeBenfMmb",
    accessor: "eeBenfMmb",
    Footer: (): ReactElement => {
      return (
        <span className="text-sm font-bold text-primary-main">
          <Trans i18nKey="PaymentRequisitionDetailScreen.benefitDetailsTable.footer.common.total" />
        </span>
      );
    },
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.subTotal",
    id: "subTotal",
    className: "text-sm font-bold text-primary-main",
    accessor: (
      data:
        | SchemeTransferBenefitsDetailsViewModel
        | IntraGroupTransferBenefitsDetailsViewModel
    ): string => {
      return (
        data.eeBenfPreMpf +
        data.eeBenfPostMpf +
        data.erBenfPreMpf +
        data.erBenfPostMpf +
        data.eeBenfOrso +
        data.erBenfOrso +
        data.eeBenfMmb +
        data.erBenfMmb
      ).toFixed(2);
    },
    Footer: (
      table: FooterProps<
        | SchemeTransferBenefitsDetailsViewModel
        | IntraGroupTransferBenefitsDetailsViewModel
      >
    ): ReactElement => {
      const total = useMemo(
        () =>
          table.rows
            .reduce((sum, row) => {
              return (
                sum +
                (row.original.eeBenfPreMpf +
                  row.original.eeBenfPostMpf +
                  row.original.erBenfPreMpf +
                  row.original.erBenfPostMpf +
                  row.original.eeBenfOrso +
                  row.original.erBenfOrso +
                  row.original.eeBenfMmb +
                  row.original.erBenfMmb)
              );
            }, 0)
            .toFixed(2),
        [table.rows]
      );

      return (
        <span className="text-sm font-bold text-primary-main">{total}</span>
      );
    },
  },
];

export const MmbTransferBenefitsDetailsColumns: Column<MmbTransferBenefitsDetailsViewModel>[] =
  [
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.typeOfTransfer",
      id: "transferType",
      accessor: "transferType",
      Cell: TransferTypeCell<MmbTransferBenefitsDetailsViewModel>,
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.surnameZh",
      id: "surnameZh",
      accessor: "surnameZh",
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.givenNameZh",
      id: "givenNameZh",
      accessor: "givenNameZh",
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.surnameEn",
      id: "surnameEn",
      accessor: "surnameEn",
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.givenNameEn",
      id: "givenNameEn",
      accessor: "givenNameEn",
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdType",
      id: "idType",
      accessor: "idType",
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdNo",
      id: "idNo",
      accessor: "idNo",
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.mmbTransfer.mmbAmount",
      id: "mmbAmount",
      accessor: "mmbAmount",
      Footer: (): ReactElement => {
        return (
          <span className="text-sm font-bold text-primary-main">
            <Trans i18nKey="PaymentRequisitionDetailScreen.benefitDetailsTable.footer.common.total" />
          </span>
        );
      },
    },
    {
      i18nKey:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.subTotal",
      id: "subTotal",
      className: "text-sm font-bold text-primary-main",
      accessor: "mmbAmount",
      Footer: (
        table: FooterProps<MmbTransferBenefitsDetailsViewModel>
      ): ReactElement => {
        const total = useMemo(
          () =>
            table.rows
              .reduce((sum, row) => {
                return sum + row.original.mmbAmount;
              }, 0)
              .toFixed(2),
          [table.rows]
        );

        return (
          <span className="text-sm font-bold text-primary-main">{total}</span>
        );
      },
    },
  ];
