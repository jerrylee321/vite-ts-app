import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import IdleTooLongAlertDialog from ".";

test("IdleTooLongAlertDialog", () => {
  renderWithProviders(
    <IdleTooLongAlertDialog open={true} onClose={jest.fn()} />
  );

  expect(screen.getByTestId("MessageDialogTitle")).toHaveTextContent(
    "has ended"
  );
});
