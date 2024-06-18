import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import DeleteUserGroupFailDialog from ".";

describe("DeleteUserGroupFailDialog", () => {
  test("renders dialog with correct elements and buttons", async () => {
    const user = userEvent.setup({ advanceTimers });
    const onCloseDialog = jest.fn();
    const onSubmitDelete = jest.fn();
    renderWithProviders(
      <DeleteUserGroupFailDialog
        isDialogOpen={true}
        onCloseDialog={onCloseDialog}
        userGroupStatus="Active"
        onSubmitDelete={onSubmitDelete}
      />
    );

    // Dialog is visible
    const dialog = screen.getByTestId("DeleteUserGroupDialog");
    expect(dialog).toBeVisible();

    // Dialog contains two text messages
    expect(
      screen.getByTestId("DeleteUserGroupDialogMessage")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("DeleteUserGroupDialogConfirm")
    ).toBeInTheDocument();

    // Dialog contains buttons
    const backButton = screen.getByTestId("DeleteUserGroupDialogBackButton");
    const confirmButton = screen.getByTestId(
      "DeleteUserGroupDialogSubmitButton"
    );
    expect(backButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    // Clicking on the back button calls onCloseDialog function
    await user.click(backButton);
    expect(onCloseDialog).toHaveBeenCalledTimes(1);
  });

  test("clicking on confirm button calls onSubmitDelete function", async () => {
    const user = userEvent.setup({ advanceTimers });
    const onCloseDialog = jest.fn();
    const onSubmitDelete = jest.fn();
    renderWithProviders(
      <DeleteUserGroupFailDialog
        isDialogOpen={true}
        onCloseDialog={onCloseDialog}
        userGroupStatus="Active"
        onSubmitDelete={onSubmitDelete}
      />
    );

    const confirmButton = screen.getByTestId(
      "DeleteUserGroupDialogSubmitButton"
    );
    expect(confirmButton).toBeInTheDocument();

    await user.click(confirmButton);
    await waitFor(() => {
      expect(onCloseDialog).toHaveBeenCalledTimes(1);
    });
  });
});
