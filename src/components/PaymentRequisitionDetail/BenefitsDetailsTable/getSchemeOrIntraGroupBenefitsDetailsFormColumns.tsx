import { ReactElement, useMemo } from "react";
import { Trans } from "react-i18next";
import { CellProps } from "react-table";
import { useFormikContext } from "formik";

import { isNumber } from "../../../utils/isNumber";
import { FormTableColumnsGetter, makeInputCell } from "../../FormTable";
import {
  IntraGroupBenefitsDetailsRowModel,
  SchemeBenefitsDetailsRowModel,
} from "../UpdateFormModel/BenefitsDetailsRowSchema";
import {
  FormTableName,
  UpdateIntraGroupPaymentRequisitionFormModel,
  UpdateSchemePaymentRequisitionFormModel,
} from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import { TransferTypeCell } from "./ReadOnlyBenefitsDetailsColumns";

type RowModel =
  | SchemeBenefitsDetailsRowModel
  | IntraGroupBenefitsDetailsRowModel;
type FormModel =
  | UpdateSchemePaymentRequisitionFormModel
  | UpdateIntraGroupPaymentRequisitionFormModel;

const EePreMpfInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "eePreMpf",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const EePostMpfInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "eePostMpf",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const EeOrsoInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "eeOrso",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const EeMmbInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "eeMmb",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const ErPreMpfInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "erPreMpf",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const ErPostMpfInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "erPostMpf",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const ErOrsoInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "erOrso",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const ErMmbInputCell = makeInputCell<RowModel, FormModel>({
  type: "number",
  formTableName: FormTableName,
  columnName: "erMmb",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const SubTotalCell = ({ row }: CellProps<RowModel>): ReactElement => {
  const { values } = useFormikContext<FormModel>();
  const formRow = values.benefitsDetails[row.index];

  const subTotal = useMemo((): number | string => {
    if (
      !isNumber(formRow.eeMmb) ||
      !isNumber(formRow.eeOrso) ||
      !isNumber(formRow.eePreMpf) ||
      !isNumber(formRow.eePostMpf) ||
      !isNumber(formRow.erMmb) ||
      !isNumber(formRow.erOrso) ||
      !isNumber(formRow.erPreMpf) ||
      !isNumber(formRow.erPostMpf)
    ) {
      return "N/A";
    }

    return (
      formRow.eeMmb +
      formRow.eeOrso +
      formRow.eePreMpf +
      formRow.eePostMpf +
      formRow.erMmb +
      formRow.erOrso +
      formRow.erPreMpf +
      formRow.erPostMpf
    ).toFixed(2);
  }, [
    formRow.eeMmb,
    formRow.eeOrso,
    formRow.eePostMpf,
    formRow.eePreMpf,
    formRow.erMmb,
    formRow.erOrso,
    formRow.erPostMpf,
    formRow.erPreMpf,
  ]);

  return (
    <span className="text-sm font-bold text-primary-main">{subTotal}</span>
  );
};
const TotalCell = (): ReactElement => {
  const { values } = useFormikContext<FormModel>();
  const total = useMemo(() => {
    const _total = values.benefitsDetails.reduce<number | string>(
      (sum, row) => {
        if (!isNumber(sum)) {
          return sum;
        }

        if (
          !isNumber(row.eeMmb) ||
          !isNumber(row.eeOrso) ||
          !isNumber(row.eePreMpf) ||
          !isNumber(row.eePostMpf) ||
          !isNumber(row.erMmb) ||
          !isNumber(row.erOrso) ||
          !isNumber(row.erPreMpf) ||
          !isNumber(row.erPostMpf)
        ) {
          return "N/A";
        }

        return (
          sum +
          row.eeMmb +
          row.eeOrso +
          row.eePreMpf +
          row.eePostMpf +
          row.erMmb +
          row.erOrso +
          row.erPreMpf +
          row.erPostMpf
        );
      },
      0
    );
    return isNumber(_total) ? _total.toFixed(2) : _total;
  }, [values.benefitsDetails]);

  return <span className="text-sm font-bold text-primary-main">{total}</span>;
};

export const getSchemeOrIntraGroupBenefitsDetailsFormColumns: FormTableColumnsGetter<
  RowModel,
  FormModel
> = () => [
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.typeOfTransfer",
    id: "transferType",
    accessor: "transferType",
    Cell: TransferTypeCell<RowModel>,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.newOrExistingMember",
    id: "newMemberFlg",
    accessor: "newMemberFlg",
    i18nValueMap: {
      true: "PaymentRequisitionDetailScreen.benefitDetailsTable.newOrExistingMember.new",
      false:
        "PaymentRequisitionDetailScreen.benefitDetailsTable.newOrExistingMember.existing",
    },
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
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdType",
    id: "memberIdType",
    accessor: "idType",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.memberIdNo",
    id: "memberIdNo",
    accessor: "idNo",
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.preMpfServiceEeBenefits",
    id: "preMpfServiceEeBenefits",
    Cell: EePreMpfInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.postMpfServiceEeBenefits",
    id: "postMpfServiceEeBenefits",
    Cell: EePostMpfInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.preMpfServiceErBenefits",
    id: "preMpfServiceErBenefits",
    Cell: ErPreMpfInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.postMpfServiceErBenefits",
    id: "postMpfServiceErBenefits",
    Cell: ErPostMpfInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.orsoEmployerBenefits",
    id: "orsoEmployerBenefits",
    Cell: ErOrsoInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.orsoEmployeeBenefits",
    id: "orsoEmployeeBenefits",
    Cell: EeOrsoInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.ErPortionMmbAmount",
    id: "ErPortionMmbAmount",
    Cell: ErMmbInputCell,
  },
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.schemeOrIntraGroupTransfer.EePortionMmbAmount",
    id: "EePortionMmbAmount",
    Cell: EeMmbInputCell,
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
    Cell: SubTotalCell,
    Footer: TotalCell,
  },
];
