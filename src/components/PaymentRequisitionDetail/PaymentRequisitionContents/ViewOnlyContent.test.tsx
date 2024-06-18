import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";

import ViewOnlyContent from "./ViewOnlyContent";
import { PaymentRequisitionDetailViewModel } from ".";

describe("ViewOnlyContent", () => {
  const mockViewModelWithFollowUp: PaymentRequisitionDetailViewModel = {
    transferType: "IntraGroupTransfer",
    memberList: [],
    transferRequest: {
      originalRequest: {
        trusteeName: "AIB Company (Trustee) Limited",
        schemeName: "BEA Bunda (MPF) Master Trust Schemes",
        employerName: "Personal Account (ORIGINAL)",
        employerAccountNumber: "91234567891",
      },
      newRequest: {
        trusteeName: "AIA Company (Trustee) Limited",
        schemeName: "AIA MPF - Prime Value Choice",
        employerName: "Personal Account (NEW)",
        employerAccountNumber: "91234567890",
      },
      transferType: "IntraGroupTransfer",
      employerTransferRefNo: "TF95026520230421033218",
      transferEffectiveDate: new Date("2022-08-14"),
      followUp: {
        title: "followUpTitle",
        comment: "followUpComment",
      },
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

  const mockViewModelWithoutFollowUp: PaymentRequisitionDetailViewModel = {
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

  it("should able to render trusteeComment", async () => {
    renderWithProviders(
      <ViewOnlyContent
        viewModel={mockViewModelWithFollowUp}
        summaryScreenPath="#"
      />
    );

    expect(screen.queryByTestId("trusteeComment")).toBeInTheDocument();
  });

  it("should not able to render trusteeComment", async () => {
    renderWithProviders(
      <ViewOnlyContent
        viewModel={mockViewModelWithoutFollowUp}
        summaryScreenPath="#"
      />
    );

    expect(screen.queryByTestId("trusteeComment")).toEqual(null);
  });
});
