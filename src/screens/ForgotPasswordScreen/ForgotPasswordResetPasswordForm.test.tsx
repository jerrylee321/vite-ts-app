import { act, screen, waitFor } from "@testing-library/react";

import { passwordIsValidResult } from "../../models/CommonAuthentication";
import { renderWithProviders } from "../../utils/test/render";
import { pasteTextIntoInput, setupUserEvent } from "../../utils/test/userEvent";

import ForgotPasswordResetPasswordForm, {
  ForgotPasswordResetPasswordFormProps,
} from "./ForgotPasswordResetPasswordForm";

describe("ForgotPasswordResetPasswordForm", () => {
  test("should submit", async () => {
    const onSubmit: jest.MockedFunction<
      ForgotPasswordResetPasswordFormProps["onSubmit"]
    > = jest.fn();
    const user = setupUserEvent();
    renderWithProviders(
      <ForgotPasswordResetPasswordForm
        isSubmitting={false}
        portal="mpfa"
        variant="forgot"
        onSubmit={onSubmit}
        onPasswordValidate={jest.fn()}
        isPasswordValid={true}
        isPasswordValidating={false}
        passwordValidationResult={passwordIsValidResult}
      />
    );

    const val = "Abc1234567890!";
    await pasteTextIntoInput(user, "newPassword", val);
    await pasteTextIntoInput(user, "confirmPassword", "not-the-same");
    act(() => {
      screen.getByTestId("confirmPassword").querySelector("input")?.blur();
    });
    expect(
      await screen.findByTestId("AuthRequirementHint-unmatch")
    ).toBeInTheDocument();

    await pasteTextIntoInput(user, "confirmPassword", val);

    await user.click(screen.getByTestId("submit"));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
