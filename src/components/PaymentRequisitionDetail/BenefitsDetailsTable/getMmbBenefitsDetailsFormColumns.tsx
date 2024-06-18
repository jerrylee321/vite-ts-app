import { ReactElement, useMemo } from "react";
import { Trans } from "react-i18next";
import { CellProps } from "react-table";
import { useFormikContext } from "formik";

import { isNumber } from "../../../utils/isNumber";
import { FormTableColumnsGetter, makeInputCell } from "../../FormTable";
import { MmbBenefitsDetailsRowModel } from "../UpdateFormModel/BenefitsDetailsRowSchema";
import {
  FormTableName,
  UpdateMmbPaymentRequisitionFormModel,
} from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import { TransferTypeCell } from "./ReadOnlyBenefitsDetailsColumns";

const MmbAmountInputCell = makeInputCell<
  MmbBenefitsDetailsRowModel,
  UpdateMmbPaymentRequisitionFormModel
>({
  type: "number",
  formTableName: FormTableName,
  columnName: "mmbAmount",
  numberInputOptions: {
    decimalPlaces: 2,
    disableHandleEmptyNumberInput: false,
  },
});
const SubTotalCell = ({
  row,
}: CellProps<MmbBenefitsDetailsRowModel>): ReactElement => {
  const { values } = useFormikContext<UpdateMmbPaymentRequisitionFormModel>();
  const formRow = values.benefitsDetails[row.index];

  const subTotal = useMemo((): number | string => {
    if (!isNumber(formRow.mmbAmount)) {
      return "N/A";
    }

    return formRow.mmbAmount.toFixed(2);
  }, [formRow.mmbAmount]);

  return (
    <span className="text-sm font-bold text-primary-main">{subTotal}</span>
  );
};
const TotalCell = (): ReactElement => {
  const { values } = useFormikContext<UpdateMmbPaymentRequisitionFormModel>();
  const total = useMemo(() => {
    const _total = values.benefitsDetails.reduce<number | string>(
      (sum, row) => {
        if (!isNumber(sum)) {
          return sum;
        }

        if (!isNumber(row.mmbAmount)) {
          return "N/A";
        }

        return sum + row.mmbAmount;
      },
      0
    );
    return isNumber(_total) ? _total.toFixed(2) : _total;
  }, [values.benefitsDetails]);

  return <span className="text-sm font-bold text-primary-main">{total}</span>;
};

export const getMmbBenefitsDetailsFormColumns: FormTableColumnsGetter<
  MmbBenefitsDetailsRowModel,
  UpdateMmbPaymentRequisitionFormModel
> = () => [
  {
    i18nKey:
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.common.typeOfTransfer",
    id: "transferType",
    accessor: "transferType",
    Cell: TransferTypeCell<MmbBenefitsDetailsRowModel>,
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
      "PaymentRequisitionDetailScreen.benefitDetailsTable.header.mmbTransfer.mmbAmount",
    id: "mmbAmount",
    Cell: MmbAmountInputCell,
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
