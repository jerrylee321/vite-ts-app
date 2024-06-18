import { screen, waitFor } from "@testing-library/react";

import { APIError } from "../../apis/models/APIError";
import { renderWithProviders } from "../../utils/test/render";

import ForgotPasswordOTPForm, {
  ForgotPasswordOTPFormProps,
} from "./ForgotPasswordOTPForm";

jest.mock("../../components/AuthOTPInput");

describe("ForgotPasswordOTPForm", () => {
  test("render", async () => {
    const onSubmit: jest.MockedFunction<
      ForgotPasswordOTPFormProps["onSubmit"]
    > = jest.fn();
    renderWithProviders(
      <ForgotPasswordOTPForm
        isSubmitting={false}
        variant="forgot"
        onSubmit={onSubmit}
      />
    );

    await waitFor(() => {
      expect(screen.queryByTestId("otp.invalid")).not.toBeInTheDocument();
    });
  });

  test("render last error", async () => {
    const onSubmit: jest.MockedFunction<
      ForgotPasswordOTPFormProps["onSubmit"]
    > = jest.fn();
    renderWithProviders(
      <ForgotPasswordOTPForm
        isSubmitting={false}
        variant="forgot"
        onSubmit={onSubmit}
        lastError={new Error("unknown error")}
      />
    );

    expect(await screen.findByTestId("otp.invalid")).toBeInTheDocument();
  });

  test("render otp error", async () => {
    const onSubmit: jest.MockedFunction<
      ForgotPasswordOTPFormProps["onSubmit"]
    > = jest.fn();
    renderWithProviders(
      <ForgotPasswordOTPForm
        isSubmitting={false}
        variant="forgot"
        onSubmit={onSubmit}
        lastError={
          new APIError({
            traceId: "trace-id",
            errorCode: "OTP1234",
            errorMessage: {},
          })
        }
      />
    );

    expect(await screen.findByTestId("otp.invalid")).toBeInTheDocument();
  });
});
