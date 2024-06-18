import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import ClearAlertDialog from ".";

describe("ClearAlertDialog", () => {
  test("renders dialog with correct elements and buttons", async () => {
    const user = userEvent.setup({ advanceTimers });

    const onCloseDialog = jest.fn();
    const onConfirmClick = jest.fn();
    renderWithProviders(
      <ClearAlertDialog
        isConfirmDialogOpen={true}
        onCloseDialog={onCloseDialog}
        onConfirmClick={onConfirmClick}
      />
    );

    // Dialog is visible
    const dialog = screen.getByTestId("comfirmDialog");
    expect(dialog).toBeVisible();

    // Warning alert icon is displayed
    const alertIcon = screen.getByTestId("WarningAlertIcon");
    expect(alertIcon).toBeInTheDocument();

    // Dialog contains two text messages
    expect(screen.getByTestId("ClearAlertMessage")).toBeInTheDocument();
    expect(screen.getByTestId("ClearAlertConfirmation")).toBeInTheDocument();

    // Dialog contains two buttons
    const backButton = screen.getByTestId("actionDialogBackBtn");
    expect(backButton).toBeInTheDocument();
    expect(screen.getByTestId("actionDialogConfirmBtn")).toBeInTheDocument();

    // Clicking on the back button calls onCloseDialog function
    await user.click(backButton);
    expect(onCloseDialog).toHaveBeenCalledTimes(1);
  });

  test("renders dialog with correct elements and buttons", async () => {
    const user = userEvent.setup({ advanceTimers });
    const onCloseDialog = jest.fn();
    const onConfirmClick = jest.fn();
    renderWithProviders(
      <ClearAlertDialog
        isConfirmDialogOpen={true}
        onCloseDialog={onCloseDialog}
        onConfirmClick={onConfirmClick}
      />
    );

    // Clicking on the confirm button calls onConfirmClick function
    const confirmButton = screen.getByTestId("actionDialogConfirmBtn");
    await user.click(confirmButton);
    expect(onConfirmClick).toHaveBeenCalledTimes(1);
  });
});
