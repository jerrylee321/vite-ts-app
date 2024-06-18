import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import UploadTemplateDialog from ".";

describe("UploadTemplateDialog", () => {
  test("should download", async () => {
    const user = userEvent.setup({ advanceTimers });

    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    const mockOnDownloadClick = jest.fn();

    renderWithProviders(
      <UploadTemplateDialog
        dialogProps={{ open: true }}
        downloadTemplateName="abc.xlsx"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onDownloadTemplateClick={mockOnDownloadClick}
      />
    );

    const downloadButton = screen.getByTestId(
      "UploadDataByBatchDialog.downloadTemplateButton"
    );
    expect(downloadButton).toBeInTheDocument();

    await user.click(downloadButton);
    expect(mockOnDownloadClick).toBeCalled();
  });

  test("should confirm", async () => {
    const user = userEvent.setup({ advanceTimers });

    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    const mockOnDownloadClick = jest.fn();

    const file = new File(["file"], "test.pdf", {
      type: "image/pdf",
    });

    renderWithProviders(
      <UploadTemplateDialog
        initialFiles={[file]}
        dialogProps={{ open: true }}
        downloadTemplateName="abc.xlsx"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onDownloadTemplateClick={mockOnDownloadClick}
      />
    );

    const confirmButton = screen.getByTestId(
      "UploadDataByBatchDialog.confirmButton"
    );
    expect(confirmButton).toBeInTheDocument();

    await user.click(confirmButton);
    expect(mockOnConfirm).toBeCalled();
  });

  test("should remove", async () => {
    const user = userEvent.setup({ advanceTimers });

    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    const mockOnDownloadClick = jest.fn();

    const file = new File(["file"], "test.pdf", {
      type: "image/pdf",
    });

    renderWithProviders(
      <UploadTemplateDialog
        initialFiles={[file]}
        dialogProps={{ open: true }}
        downloadTemplateName="abc.xlsx"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onDownloadTemplateClick={mockOnDownloadClick}
      />
    );

    expect(screen.getByText("test.pdf")).toBeInTheDocument();

    const removeButton = screen.getByTestId(
      "UploadDataByBatchDialog.removeFile.test.pdf"
    );
    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);
    await user.click(screen.getByTestId("confirmDialogSubmitBtn"));
    expect(() => screen.getByText("test.pdf")).toThrow();
  });
});
