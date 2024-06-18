import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SubmissionState } from "../../hooks/useFormSubmissionState";
import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import SubmitDialogsFlow from ".";

describe("SubmitDialogsFlow component", () => {
  it("should render the submit dialog", async () => {
    const user = userEvent.setup({ advanceTimers });

    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnConfirmSuccess = jest.fn();
    const mockSubmissionState: SubmissionState<undefined, undefined> = {
      state: "toBeConfirmed",
      requestData: undefined,
    };

    renderWithProviders(
      <SubmitDialogsFlow
        submissionState={mockSubmissionState}
        confirmTitleMessageKey="SubmitDialogsFlow.test.confirmTitle"
        onConfirmClose={mockOnClose}
        confirmBackMessageKey="SubmitDialogsFlow.test.confirmBack"
        confirmBackTestId="confirmBackButton"
        confirmSubmitMessageKey="SubmitDialogsFlow.test.confirmSubmit"
        confirmSubmitTestId="confirmSubmitButton"
        onConfirm={mockOnConfirm}
        confirmSuccessTitleMessageKey="SubmitDialogsFlow.test.successTitle"
        onConfirmSuccessClose={mockOnConfirmSuccess}
        confirmSuccessOkButtonMessageKey="SubmitDialogsFlow.test.successOk"
        confirmSuccessOkButtonTestId="submitOkButton"
      />
    );

    expect(screen.getByTestId("submitDialog")).toBeVisible();

    const confirmBackButton = screen.getByTestId("confirmBackButton");
    const confirmSubmitButton = screen.getByTestId("confirmSubmitButton");

    expect(confirmBackButton).toBeInTheDocument();
    expect(confirmSubmitButton).toBeInTheDocument();

    await user.click(confirmBackButton);
    expect(mockOnClose).toBeCalled();

    await user.click(confirmSubmitButton);
    expect(mockOnConfirm).toBeCalled();
  });

  it("should render the submit dialog with consent", async () => {
    const user = userEvent.setup({ advanceTimers });

    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnConfirmSuccess = jest.fn();
    const mockSubmissionState: SubmissionState<undefined, undefined> = {
      state: "toBeConfirmed",
      requestData: undefined,
    };
    renderWithProviders(
      <SubmitDialogsFlow
        submissionState={mockSubmissionState}
        requireConsent={true}
        consentMessageKey="SubmitDialogsFlow.test.consent"
        confirmTitleMessageKey="SubmitDialogsFlow.test.confirmTitle"
        onConfirmClose={mockOnClose}
        confirmBackMessageKey="SubmitDialogsFlow.test.confirmBack"
        confirmBackTestId="confirmBackButton"
        confirmSubmitMessageKey="SubmitDialogsFlow.test.confirmSubmit"
        confirmSubmitTestId="confirmSubmitButton"
        onConfirm={mockOnConfirm}
        confirmSuccessTitleMessageKey="SubmitDialogsFlow.test.successTitle"
        onConfirmSuccessClose={mockOnConfirmSuccess}
        confirmSuccessOkButtonMessageKey="SubmitDialogsFlow.test.successOk"
        confirmSuccessOkButtonTestId="submitOkButton"
      />
    );

    expect(screen.getByTestId("submitDialog")).toBeVisible();
    expect(screen.getByText(/^Consent$/)).toBeInTheDocument();

    const consentCheckbox = screen.getByTestId("submitDialogConsentCheckbox");
    expect(consentCheckbox).toBeInTheDocument();

    const confirmSubmitButton = screen.getByTestId("confirmSubmitButton");
    expect(confirmSubmitButton).toBeDisabled();

    const consentCheckboxInput = consentCheckbox.querySelector("input")!;
    expect(consentCheckboxInput).not.toBeChecked();
    await user.click(consentCheckboxInput);
    expect(consentCheckboxInput).toBeChecked();
    expect(confirmSubmitButton).toBeEnabled();
  });

  it("should render the submitted dialog", async () => {
    const user = userEvent.setup({ advanceTimers });

    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnConfirmSuccess = jest.fn();
    const mockSubmissionState: SubmissionState<undefined, undefined> = {
      state: "submitted",
      responseData: undefined,
    };

    renderWithProviders(
      <SubmitDialogsFlow
        submissionState={mockSubmissionState}
        confirmTitleMessageKey="SubmitDialogsFlow.test.confirmTitle"
        onConfirmClose={mockOnClose}
        confirmBackMessageKey="SubmitDialogsFlow.test.confirmBack"
        confirmBackTestId="confirmBackButton"
        confirmSubmitMessageKey="SubmitDialogsFlow.test.confirmSubmit"
        confirmSubmitTestId="confirmSubmitButton"
        onConfirm={mockOnConfirm}
        confirmSuccessTitleMessageKey="SubmitDialogsFlow.test.successTitle"
        onConfirmSuccessClose={mockOnConfirmSuccess}
        confirmSuccessOkButtonMessageKey="SubmitDialogsFlow.test.successOk"
        confirmSuccessOkButtonTestId="submitOkButton"
      />
    );

    expect(screen.getByTestId("submittedDialog")).toBeVisible();

    const submitOkButton = screen.getByTestId("submitOkButton");
    expect(submitOkButton).toBeInTheDocument();

    await user.click(submitOkButton);
    expect(mockOnConfirmSuccess).toBeCalled();
  });

  it("should not render the submitted dialog", () => {
    const mockOnConfirm = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnConfirmSuccess = jest.fn();
    const mockSubmissionState: SubmissionState<undefined, undefined> = {
      state: "initial",
    };

    renderWithProviders(
      <SubmitDialogsFlow
        submissionState={mockSubmissionState}
        confirmTitleMessageKey="SubmitDialogsFlow.test.confirmTitle"
        onConfirmClose={mockOnClose}
        confirmBackMessageKey="SubmitDialogsFlow.test.confirmBack"
        confirmBackTestId="confirmBackButton"
        confirmSubmitMessageKey="SubmitDialogsFlow.test.confirmSubmit"
        confirmSubmitTestId="confirmSubmitButton"
        onConfirm={mockOnConfirm}
        confirmSuccessTitleMessageKey="SubmitDialogsFlow.test.successTitle"
        onConfirmSuccessClose={mockOnConfirmSuccess}
        confirmSuccessOkButtonMessageKey="SubmitDialogsFlow.test.successOk"
        confirmSuccessOkButtonTestId="submitOkButton"
      />
    );

    expect(screen.queryByTestId("submittedDialog")).toBeNull();
  });
});
