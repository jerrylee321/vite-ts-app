import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SubmissionState } from "../../hooks/useFormSubmissionState";
import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import ConfirmDeleteSoleUserDialog from "./ConfirmDeleteSoleUserDialog";

describe("ConfirmDeleteSoleUserDialog", () => {
  const user = userEvent.setup({ advanceTimers });

  test("should submitting", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const submissionState: SubmissionState<void, void> = {
      state: "submitting",
      requestData: undefined,
    };
    renderWithProviders(
      <ConfirmDeleteSoleUserDialog
        data={null}
        onClose={onClose}
        onConfirm={onConfirm}
        submissionState={submissionState}
      />
    );

    expect(
      screen
        .getByTestId(
          "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.back"
        )
        .getAttribute("disabled")
    ).toEqual("");
    expect(
      screen
        .getByTestId(
          "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.confirm"
        )
        .getAttribute("disabled")
    ).toEqual("");
  });

  test("should close", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const submissionState: SubmissionState<void, void> = {
      state: "toBeConfirmed",
      requestData: undefined,
    };
    renderWithProviders(
      <ConfirmDeleteSoleUserDialog
        data={null}
        onClose={onClose}
        onConfirm={onConfirm}
        submissionState={submissionState}
      />
    );

    await user.click(
      screen.getByTestId(
        "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.back"
      )
    );

    expect(onClose).toBeCalledTimes(1);
  });

  test("should confirm", async () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const submissionState: SubmissionState<void, void> = {
      state: "toBeConfirmed",
      requestData: undefined,
    };
    renderWithProviders(
      <ConfirmDeleteSoleUserDialog
        data={null}
        onClose={onClose}
        onConfirm={onConfirm}
        submissionState={submissionState}
      />
    );

    await user.click(
      screen.getByTestId(
        "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.confirm"
      )
    );

    expect(onConfirm).toBeCalledTimes(1);
  });
});
