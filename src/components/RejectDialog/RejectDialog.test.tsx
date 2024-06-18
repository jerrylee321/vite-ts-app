import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RejectType } from "../../apis/models/RejectOptions";
import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import RejectDialog from ".";

describe("RejectDialog component", () => {
  const user = userEvent.setup({ advanceTimers });
  it("should render the title", () => {
    const mockOnSubmitReject = jest.fn();
    const mockOnClose = jest.fn();
    renderWithProviders(
      <RejectDialog
        title="RejectConfirmDialog.title"
        onSubmitReject={mockOnSubmitReject}
        open={true}
        onClose={mockOnClose}
        isSubmiting={false}
      />
    );
    expect(screen.getByTestId("MessageDialogTitle")).toHaveTextContent(
      "Confirm to Reject?"
    );
  });

  it("should call onSubmitReject with the correct arguments when clicking the reject button", async () => {
    const mockOnSubmitReject = jest.fn();
    const mockOnClose = jest.fn();
    renderWithProviders(
      <RejectDialog
        title="RejectConfirmDialog.title"
        onSubmitReject={mockOnSubmitReject}
        open={true}
        onClose={mockOnClose}
        isSubmiting={false}
      />
    );

    const rejectButton = screen.getByTestId("RejectDialogRejectBtn");
    const reasonInput = screen.getByLabelText("Reject Reason");
    const abandonRadioOption = screen.getByTestId("AbandonRadioOption");

    await user.click(reasonInput);
    await user.paste("Reason for rejection");
    await user.click(abandonRadioOption);
    await user.click(rejectButton);

    expect(mockOnSubmitReject).toHaveBeenCalledTimes(1);
    expect(mockOnSubmitReject).toHaveBeenCalledWith(
      "Reason for rejection",
      RejectType.abandon
    );
  });

  it("should call onClose when clicking the back button", async () => {
    const mockOnSubmitReject = jest.fn();
    const mockOnClose = jest.fn();
    renderWithProviders(
      <RejectDialog
        title="RejectConfirmDialog.title"
        onSubmitReject={mockOnSubmitReject}
        open={true}
        onClose={mockOnClose}
        isSubmiting={false}
      />
    );
    const backButton = screen.getByTestId("RejectDialogBackBtn");

    await user.click(backButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should render without any reject type options", () => {
    const mockOnSubmitReject = jest.fn();
    const mockOnClose = jest.fn();
    renderWithProviders(
      <RejectDialog
        title="RejectConfirmDialog.title"
        onSubmitReject={mockOnSubmitReject}
        open={true}
        onClose={mockOnClose}
        isSubmiting={false}
        rejectTypes={[]}
      />
    );
    expect(screen.queryByTestId("RedoRadioOption")).toBeNull();
    expect(screen.queryByTestId("AbandonRadioOption")).toBeNull();
  });
});
