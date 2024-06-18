import { screen } from "@testing-library/react";

import { SubmissionState } from "../../../hooks/useFormSubmissionState";
import { renderWithProviders } from "../../../utils/test/render";

import PaymentRequisitionDetailContent, {
  PaymentRequisitionDetailViewModel,
} from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <div data-testid="redirect"></div>,
}));

interface MockRequest {}
interface MockResponse {}

describe("PaymentRequisitionDetailContent", () => {
  const mockSubmissionState: SubmissionState<MockRequest, MockResponse> = {
    state: "initial",
  };

  const mockSwitchToStateInitial = jest.fn().mockReturnValue({
    state: "initial",
  });
  const mockSwitchToStateTBC = jest.fn().mockReturnValue({
    state: "toBeConfirmed",
  });
  const mockSwitchToStateSubmitting = jest.fn().mockReturnValue({
    state: "submitting",
  });
  const mockSwitchToStateSubmitted = jest.fn().mockReturnValue({
    state: "submitted",
  });

  const mockSubmissionReturnType = {
    submissionState: mockSubmissionState,
    switchToStateInitial: mockSwitchToStateInitial,
    switchToStateTBC: mockSwitchToStateTBC,
    switchToStateSubmitting: mockSwitchToStateSubmitting,
    switchToStateSubmitted: mockSwitchToStateSubmitted,
  };

  const mockViewModel: PaymentRequisitionDetailViewModel = {
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

  it("Preparer and Pending for Payment", async () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending for Payment"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );

    expect(screen.getByTestId("updateContent")).toBeInTheDocument();
  });
  it("Supervisor and Pending for Payment", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending for Payment"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("redirect")).toBeInTheDocument();
  });
  it("Preparer and Pending Virus Scan", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending Virus Scan"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("redirect")).toBeInTheDocument();
  });
  it("Supervisor and Pending Virus Scan", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending Virus Scan"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("redirect")).toBeInTheDocument();
  });
  it("Preparer and Pending", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("pendingReplyContent")).toBeInTheDocument();
  });
  it("Supervisor and Pending", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("pendingReplyContent")).toBeInTheDocument();
  });
  it("Preparer and Pending follow up", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending follow up"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("pendingReplyContent")).toBeInTheDocument();
  });
  it("Supervisor and Pending follow up", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Pending follow up"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("pendingReplyContent")).toBeInTheDocument();
  });

  it("Preparer and Rejected", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Rejected"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("updateContent")).toBeInTheDocument();
  });
  it("Supervisor and Rejected", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Rejected"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("redirect")).toBeInTheDocument();
  });
  it("Preparer and Saved", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Saved"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("updateContent")).toBeInTheDocument();
  });
  it("Supervisor and Saved", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Saved"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("redirect")).toBeInTheDocument();
  });

  it("Preparer and Processing", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Processing"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("viewOnlyContent")).toBeInTheDocument();
  });
  it("Supervisor and Processing", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Processing"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("viewOnlyContent")).toBeInTheDocument();
  });

  it("Preparer and Completed", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Completed"
        role="Preparer"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("viewOnlyContent")).toBeInTheDocument();
  });
  it("Supervisor and Completed", () => {
    renderWithProviders(
      <PaymentRequisitionDetailContent
        viewModel={mockViewModel}
        status="Completed"
        role="Supervisor"
        onUploadPaymenRequisition={jest.fn()}
        approveSubmissionStateReturns={mockSubmissionReturnType}
        rejectSubmissionStateReturns={mockSubmissionReturnType}
        onClickApprovePaymentRequisition={jest.fn()}
        onClickRejectPaymentRequisition={jest.fn()}
        onConfirmApprovePaymentRequisition={jest.fn()}
        onConfirmRejectPaymentRequisition={jest.fn()}
        submitSubmissionStateReturns={mockSubmissionReturnType}
        saveSubmissionStateReturns={mockSubmissionReturnType}
        onClickSubmitPaymentRequisition={jest.fn()}
        onClickSavePaymentRequisition={jest.fn()}
        onConfirmSubmitPaymentRequisition={jest.fn()}
        onConfirmSavePaymentRequisition={jest.fn()}
        onDownloadTemplateClick={jest.fn()}
        paymentMethodOptions={[]}
        summaryScreenPath="#"
      />
    );
    expect(screen.getByTestId("viewOnlyContent")).toBeInTheDocument();
  });
});
