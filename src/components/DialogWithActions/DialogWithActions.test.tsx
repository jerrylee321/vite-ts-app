import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import DialogWithActions from ".";

test("should render dialog with custom body", async () => {
  const titleString = "custom title";
  const bodyString = "custom body";
  const onClose = jest.fn();
  renderWithProviders(
    <DialogWithActions
      open={true}
      onClose={onClose}
      title={titleString}
      buttons={[
        {
          text: "BACK",
          style: "secondary",
          "data-testid": "backBtn",
        },
        {
          text: "Cancel",
          style: "secondary",
          "data-testid": "cancelBtn",
        },
        {
          text: "SUBMIT",
          style: "primary",
          "data-testid": "submitBtn",
        },
      ]}
    >
      {bodyString}
    </DialogWithActions>
  );
  expect(screen.getByTestId("DialogTitle").textContent).toBe(titleString);
  expect(screen.getByTestId("DialogBody").textContent).toBe(bodyString);

  const submitBtn = screen.getByTestId("submitBtn");
  const backBtn = screen.getByTestId("backBtn");
  const cancelBtn = screen.getByTestId("cancelBtn");

  expect(backBtn.className.indexOf("border-dialogActionButton-main")).not.toBe(
    -1
  );
  expect(backBtn.textContent).toBe("BACK");

  expect(
    cancelBtn.className.indexOf("border-dialogActionButton-main")
  ).not.toBe(-1);
  expect(cancelBtn.textContent).toBe("Cancel");

  expect(submitBtn.className.indexOf("bg-dialogActionButton-main")).not.toBe(
    -1
  );
  expect(submitBtn.textContent).toBe("SUBMIT");
});

test("should able to click on action button", async () => {
  const testString = "custom body";
  const onClose = jest.fn();
  const onResult = jest.fn();
  const onCancel = jest.fn();
  renderWithProviders(
    <DialogWithActions
      open={true}
      onClose={onClose}
      title="Any body"
      buttons={[
        {
          text: "BACK",
          style: "secondary",
          onSelect: onCancel,
          "data-testid": "backBtn",
        },
        {
          text: "SUBMIT",
          style: "primary",
          onSelect: onResult,
          "data-testid": "submitBtn",
        },
      ]}
    >
      {testString}
    </DialogWithActions>
  );

  const backBtn = screen.getByTestId("backBtn");
  const submitBtn = screen.getByTestId("submitBtn");

  fireEvent.click(backBtn);
  fireEvent.click(submitBtn);
  fireEvent.click(submitBtn);

  expect(onResult).toBeCalledTimes(2);
  expect(onCancel).toBeCalledTimes(1);
});
