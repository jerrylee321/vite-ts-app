import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import ForgotPasswordEmailView from "./ForgotPasswordEmailView";

describe("ForgotPasswordEmailView", () => {
  const handleSubmit = jest.fn();
  beforeEach(() => {
    handleSubmit.mockReset();
  });
  test("render", async () => {
    const user = setupUserEvent();

    renderWithProviders(
      <ForgotPasswordEmailView
        variant="forgot"
        handleSubmit={handleSubmit}
        isLoading={false}
        error={null}
      />
    );
    const emailEl = await screen.findByTestId("email");
    const emailInput = emailEl.querySelector("input")!;
    emailInput.focus();
    await user.paste("abc@example.com");
    await user.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: "abc@example.com",
        },
        expect.anything()
      );
    });
  });
});
