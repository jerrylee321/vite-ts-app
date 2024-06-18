import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

import { passwordIsValidResult } from "../../models/CommonAuthentication";
import { renderWithProviders } from "../../utils/test/render";

import ForgotPasswordResetPasswordForm, {
  ForgotPasswordResetPasswordFormProps,
} from "./ForgotPasswordResetPasswordForm";
import ForgotPasswordResetPasswordView from "./ForgotPasswordResetPasswordView";

function expectTruthy<T>(
  value: T
): asserts value is Exclude<T, undefined | null> {
  expect(value).toBeTruthy();
}

jest.mock<typeof import("./ForgotPasswordResetPasswordForm")>(
  "./ForgotPasswordResetPasswordForm",
  () => {
    return {
      __esModule: true,
      default: jest.fn(() => {
        return <></>;
      }),
    };
  }
);

describe("ForgotPasswordResetPasswordView", () => {
  test("render", async () => {
    let onSubmitHandle:
      | ForgotPasswordResetPasswordFormProps["onSubmit"]
      | undefined;
    const onSubmitMock = jest.fn();
    jest
      .mocked(ForgotPasswordResetPasswordForm)
      .mockImplementation(({ onSubmit }) => {
        expectTruthy(onSubmit);
        onSubmitHandle = onSubmit;
        return <></>;
      });
    renderWithProviders(
      <ForgotPasswordResetPasswordView
        variant="forgot"
        onSubmit={onSubmitMock}
        isLoading={false}
        isPasswordValidating={false}
        isPasswordValid={true}
        onPasswordValidate={jest.fn()}
        passwordValidationResult={passwordIsValidResult}
      />,
      {
        preloadedState: {
          verifyAuth: {
            verificationToken: "ver-token",
            verificationCodeId: "ver-code-id",
          },
        },
      }
    );
    await waitFor(() => {
      expectTruthy(onSubmitHandle);
    });
    const text1 = "abc";
    const text2 = "abc";
    await act(async () => {
      onSubmitHandle?.(
        {
          newPassword: text1,
          confirmPassword: text2,
        },
        {} as any
      );
    });
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          newPassword: "abc",
        }),
        expect.anything()
      );
    });
  });
});
