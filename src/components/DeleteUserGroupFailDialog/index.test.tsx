import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import DeleteUserGroupFailDialog from ".";

describe("DeleteUserGroupFailDialog", () => {
  test("renders dialog with correct elements and buttons", async () => {
    const onCloseDialog = jest.fn();
    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <DeleteUserGroupFailDialog
        isDialogOpen={true}
        onCloseDialog={onCloseDialog}
      />
    );

    // Dialog is visible
    const dialog = screen.getByTestId("comfirmDialog");
    expect(dialog).toBeVisible();

    // Dialog contains two text messages
    expect(
      screen.getByTestId("DeleteUserGroupFailDialogMessage")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("DeleteUserGroupFailDialogReminder")
    ).toBeInTheDocument();

    // Dialog contains button
    const confirmButton = screen.getByTestId("actionDialogConfirmBtn");
    expect(confirmButton).toBeInTheDocument();

    // Clicking on the confirm button calls onCloseDialog function
    await user.click(confirmButton);
    expect(onCloseDialog).toHaveBeenCalledTimes(1);
  });
});
