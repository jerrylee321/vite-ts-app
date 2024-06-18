import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CommonOption } from "../../../models/option";
import ReadOnlyTextFieldTable, {
  ReadOnlyTextFieldTableCellProp,
} from "../../ReadOnlyTextFieldTable";

export interface PaymentInfoViewModel {
  billingRefNo: string | null;
  bankName: string | null;
  paymentMethod: CommonOption | null;
  bankAcctNo: string | null;
  chequeNo: string | null;
  totalAmount: number | null;
}

interface PaymentInfoContentProps {
  paymentInfo?: PaymentInfoViewModel;
}

const PaymentInfoContent = ({
  paymentInfo,
}: PaymentInfoContentProps): ReactElement => {
  const { t } = useTranslation();

  const paymentDetailsFields: ReadOnlyTextFieldTableCellProp[] = useMemo(
    () => [
      {
        label: t(
          "PaymentRequisitionDetailScreen.PaymentDetails.billingRefNo.label"
        ),
        value: paymentInfo?.billingRefNo,
        "data-testid": "billingRefNo",
      },
      {
        label: t(
          "PaymentRequisitionDetailScreen.PaymentDetails.paymentMethod.label"
        ),
        value: paymentInfo?.paymentMethod?.name,
        isRequired: true,
        "data-testid": "paymentMethod",
      },
      {
        label: t(
          "PaymentRequisitionDetailScreen.PaymentDetails.bankName.label"
        ),
        value: paymentInfo?.bankName,
        isRequired: true,
        "data-testid": "bankName",
      },
      {
        label: t(
          "PaymentRequisitionDetailScreen.PaymentDetails.bankAccountNumber.label"
        ),
        value: paymentInfo?.bankAcctNo,
        isRequired: true,
        "data-testid": "bankAcctNo",
      },
      {
        label: t(
          "PaymentRequisitionDetailScreen.PaymentDetails.chequeNumber.label"
        ),
        value: paymentInfo?.chequeNo,
        "data-testid": "chequeNo",
      },
      {
        label: t(
          "PaymentRequisitionDetailScreen.PaymentDetails.totalPaymentAmount.label"
        ),
        value: paymentInfo?.totalAmount,
        isRequired: true,
        "data-testid": "totalPaymentAmount",
      },
    ],
    [
      paymentInfo?.bankAcctNo,
      paymentInfo?.bankName,
      paymentInfo?.billingRefNo,
      paymentInfo?.chequeNo,
      paymentInfo?.paymentMethod,
      paymentInfo?.totalAmount,
      t,
    ]
  );
  return (
    <section>
      <ReadOnlyTextFieldTable
        className="mt-2 grid grid-cols-4 gap-2"
        dataSet={paymentDetailsFields}
        defaultValue="-"
      />
    </section>
  );
};

export default PaymentInfoContent;
