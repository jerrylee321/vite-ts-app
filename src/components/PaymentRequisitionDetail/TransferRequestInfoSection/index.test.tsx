import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";
import { PaymentRequisitionDetailViewModel } from "../PaymentRequisitionContents";

import TransferRequestInfoSection from ".";

describe("TransferRequestInfoSection", () => {
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

  it("should able to render", async () => {
    renderWithProviders(
      <TransferRequestInfoSection
        viewModel={mockViewModelWithFollowUp.transferRequest}
      />
    );

    expect(screen.getByTestId("typeOfTransfer")).toBeInTheDocument();
    expect(screen.getByTestId("employerTransferRefNumber")).toBeInTheDocument();
    expect(screen.getByTestId("typeOfTransfer")).toBeInTheDocument();
    expect(screen.getByTestId("transferEffectiveDate")).toBeInTheDocument();

    const mockNewRequestViewModel =
      mockViewModelWithFollowUp.transferRequest.newRequest;
    const mockOriginalRequestViewModel =
      mockViewModelWithFollowUp.transferRequest.originalRequest;

    expect(screen.getByTestId("newTrusteeName")).toBeInTheDocument();
    expect(
      screen.getByText(mockNewRequestViewModel.trusteeName!)
    ).toBeInTheDocument();
    expect(screen.getByTestId("originalTrusteeName")).toBeInTheDocument();
    expect(
      screen.getByText(mockOriginalRequestViewModel.trusteeName!)
    ).toBeInTheDocument();

    expect(screen.getByTestId("newSchemeName")).toBeInTheDocument();
    expect(
      screen.getByText(mockNewRequestViewModel.schemeName!)
    ).toBeInTheDocument();
    expect(screen.getByTestId("originalSchemeName")).toBeInTheDocument();
    expect(
      screen.getByText(mockOriginalRequestViewModel.schemeName!)
    ).toBeInTheDocument();

    expect(screen.getByTestId("newEmployerName")).toBeInTheDocument();
    expect(
      screen.getByText(mockNewRequestViewModel.employerName!)
    ).toBeInTheDocument();
    expect(screen.getByTestId("originalEmployerName")).toBeInTheDocument();
    expect(
      screen.getByText(mockOriginalRequestViewModel.employerName!)
    ).toBeInTheDocument();

    expect(screen.getByTestId("newEmployerAccountNumber")).toBeInTheDocument();
    expect(
      screen.getByText(mockNewRequestViewModel.employerAccountNumber!)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("originalEmployerAccountNumber")
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockOriginalRequestViewModel.employerAccountNumber!)
    ).toBeInTheDocument();
  });

  it("should not show follow up section", async () => {
    renderWithProviders(
      <TransferRequestInfoSection
        viewModel={mockViewModelWithoutFollowUp.transferRequest}
      />
    );
    expect(screen.queryByTestId("followUpSection")).toEqual(null);
  });

  it("should show follow up section", async () => {
    renderWithProviders(
      <TransferRequestInfoSection
        viewModel={mockViewModelWithFollowUp.transferRequest}
      />
    );
    expect(screen.queryByTestId("followUpSection")).not.toEqual(null);

    expect(screen.getByTestId("followUpReason")).toBeInTheDocument();
    expect(
      screen.getByText(
        mockViewModelWithFollowUp.transferRequest.followUp?.title ?? ""
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("followUpComment")).toBeInTheDocument();
    expect(
      screen.getByText(
        mockViewModelWithFollowUp.transferRequest.followUp?.comment ?? ""
      )
    ).toBeInTheDocument();
  });
});
