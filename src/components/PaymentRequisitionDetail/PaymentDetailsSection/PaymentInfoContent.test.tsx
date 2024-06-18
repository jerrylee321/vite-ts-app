import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";
import { PaymentRequisitionDetailViewModel } from "../PaymentRequisitionContents";

import PaymentInfoContent from "./PaymentInfoContent";

describe("PaymentInfoContent", () => {
  const mockIntraGroupViewModel: PaymentRequisitionDetailViewModel = {
    transferType: "IntraGroupTransfer",
    memberList: [],
    transferRequest: {
      originalRequest: {
        trusteeName: "AIB Company (Trustee) Limited",
        schemeName: "BEA Bunda (MPF) Master Trust Schemes",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      newRequest: {
        trusteeName: "AIA Company (Trustee) Limited",
        schemeName: "AIA MPF - Prime Value Choice",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      transferType: "IntraGroupTransfer",
      employerTransferRefNo: "TF95026520230421033218",
      transferEffectiveDate: new Date("2022-08-14"),
      followUp: null,
    },
    paymentInfo: {
      billingRefNo: "billRefNo",
      bankName: "bankName",
      paymentMethod: { name: "payMethod", key: "payMethod" },
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalAmount: 100,
    },
    trusteeComment: "trusteeComment",
  };

  it("should able to render", async () => {
    renderWithProviders(
      <PaymentInfoContent paymentInfo={mockIntraGroupViewModel.paymentInfo} />
    );

    expect(screen.getByTestId("billingRefNo")).toBeInTheDocument();
    expect(screen.getByTestId("paymentMethod")).toBeInTheDocument();
    expect(screen.getByTestId("bankName")).toBeInTheDocument();
    expect(screen.getByTestId("bankAcctNo")).toBeInTheDocument();
    expect(screen.getByTestId("chequeNo")).toBeInTheDocument();
    expect(screen.getByTestId("totalPaymentAmount")).toBeInTheDocument();
  });
});
