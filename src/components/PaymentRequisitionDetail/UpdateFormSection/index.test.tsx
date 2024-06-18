import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";
import { PaymentRequisitionDetailViewModel } from "../PaymentRequisitionContents";

import UpdatePaymentRequisitionSection from ".";

describe("PendingReplyContent", () => {
  const mockIntraGroupTransferViewModel: PaymentRequisitionDetailViewModel = {
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

  const mockMmbTransferViewModel: PaymentRequisitionDetailViewModel = {
    transferType: "MmbTransfer",
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

  it("should render update scheme transfer or intra group transfer payment requisition form", async () => {
    renderWithProviders(
      <UpdatePaymentRequisitionSection
        viewModel={mockIntraGroupTransferViewModel}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onUploadUpdateForm={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );

    expect(
      screen.getByTestId("UpdateSchemeOrIntraGroupPaymentRequisitionForm")
    ).toBeInTheDocument();
  });

  it("should render update mmb payment requisition form ", async () => {
    renderWithProviders(
      <UpdatePaymentRequisitionSection
        viewModel={mockMmbTransferViewModel}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onUploadUpdateForm={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );

    expect(
      screen.getByTestId("UpdateMmbPaymentRequisitionForm")
    ).toBeInTheDocument();
  });
});
