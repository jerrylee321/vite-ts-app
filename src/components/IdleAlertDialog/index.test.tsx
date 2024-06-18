import { IIdleTimer } from "react-idle-timer";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import IdleAlertDialog from ".";

test("IdleAlertDialog", async () => {
  const idleTimer = {
    getRemainingTime: jest.fn().mockReturnValue(3000),
  } as any as IIdleTimer;
  renderWithProviders(
    <IdleAlertDialog
      open={true}
      onClose={jest.fn()}
      onSelectLogout={jest.fn()}
      idleTimer={idleTimer}
    />
  );

  expect(screen.getByTestId("MessageDialogTitle")).toHaveTextContent(
    "3 seconds"
  );
});
