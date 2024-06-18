import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import ForgotPasswordOTPForm, {
  ForgotPasswordOTPFormProps,
} from "./ForgotPasswordOTPForm";
import ForgotPasswordOTPView from "./ForgotPasswordOTPView";

function expectTruthy<T>(
  value: T
): asserts value is Exclude<T, undefined | null> {
  expect(value).toBeTruthy();
}

jest.mock<typeof import("./ForgotPasswordOTPForm")>(
  "./ForgotPasswordOTPForm",
  () => {
    return {
      __esModule: true,
      default: jest.fn(() => {
        return <></>;
      }),
    };
  }
);

describe("ForgotPasswordOTPView", () => {
  test("render", async () => {
    let onSubmitHandle: ForgotPasswordOTPFormProps["onSubmit"] | undefined;
    const onSubmitMock = jest.fn();
    const onResend = jest.fn();
    jest.mocked(ForgotPasswordOTPForm).mockImplementation(({ onSubmit }) => {
      expectTruthy(onSubmit);
      onSubmitHandle = onSubmit;
      return <></>;
    });
    renderWithProviders(
      <ForgotPasswordOTPView
        variant="forgot"
        onSubmit={onSubmitMock}
        isLoading={false}
        error={null}
        onResend={onResend}
        isResending={false}
        nextSendUntil={new Date()}
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
    await act(async () => {
      onSubmitHandle?.(
        {
          otp: "123456",
        },
        {} as any
      );
    });
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(
        {
          otp: "123456",
        },
        expect.anything()
      );
    });
  });
});
