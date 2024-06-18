const mockCaptcha = jest.fn();
const mockNavigateComponent: jest.MockedFunction<typeof Navigate> = jest.fn();
const mockNavigate: jest.MockedFunction<ReturnType<typeof useNavigate>> =
  jest.fn();

import { Navigate, useNavigate } from "react-router-dom";
import { PreloadedState } from "@reduxjs/toolkit";
import { act, screen, waitFor } from "@testing-library/react";
import MockCaptcha from "frontend-common/src/components/tests/MockCaptcha";

import useRequestForgotPasswordOTP from "../../queries/useRequestForgotPasswordOTP";
import useResendForgotPasswordOTP from "../../queries/useResendForgotPasswordOTP";
import useResetForgotPassword from "../../queries/useResetForgotPassword";
import useVerifyForgotPasswordOTP from "../../queries/useVerifyForgotPasswordOTP";
import { initialState, RootState } from "../../redux";
import AppRoutes from "../../routes/AppRoutes";
import { renderRouteWithProviders } from "../../utils/test/render";
import waitForLazyLoad from "../../utils/test/waitForLazyLoad";

import ForgotPasswordEmailView from "./ForgotPasswordEmailView";
import ForgotPasswordOTPView from "./ForgotPasswordOTPView";
import ForgotPasswordResetPasswordView from "./ForgotPasswordResetPasswordView";

const mockRequestOTP: jest.MockedFunction<
  ReturnType<typeof useRequestForgotPasswordOTP>["mutateAsync"]
> = jest.fn();
const mockVerifyOTP: jest.MockedFunction<
  ReturnType<typeof useVerifyForgotPasswordOTP>["mutateAsync"]
> = jest.fn();
const mockResendOTP: jest.MockedFunction<
  ReturnType<typeof useResendForgotPasswordOTP>["mutateAsync"]
> = jest.fn();
const mockResetPassword: jest.MockedFunction<
  ReturnType<typeof useResetForgotPassword>["mutateAsync"]
> = jest.fn();

jest.mock("../../Config", () => {
  return {
    __esModule: true,
    default: {
      ...jest.requireActual("../../Config").default,
      hcaptcha: {
        sitekey: "site-key",
        channelcode: "channel-code",
        promptForgotPassword: true,
      },
    },
  };
});

jest.mock("../../queries/useRequestForgotPasswordOTP", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        mutateAsync: mockRequestOTP,
      } as any;
    }),
  };
});

jest.mock("../../queries/useVerifyForgotPasswordOTP", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        mutateAsync: mockVerifyOTP,
      } as any;
    }),
  };
});

jest.mock("../../queries/useResendForgotPasswordOTP", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        mutateAsync: mockResendOTP,
      } as any;
    }),
  };
});

jest.mock("../../queries/useResetForgotPassword", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        mutateAsync: mockResetPassword,
      } as any;
    }),
  };
});

jest.mock("./ForgotPasswordEmailView", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return <></>;
    }),
  };
});

jest.mock("./ForgotPasswordOTPView", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return <></>;
    }),
  };
});

jest.mock("./ForgotPasswordResetPasswordView", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return <></>;
    }),
  };
});

jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  Navigate: mockNavigateComponent,
  useNavigate: () => mockNavigate,
}));

jest.mock("@hcaptcha/react-hcaptcha", () => {
  const { forwardRef } = jest.requireActual("react");

  return {
    __esModule: true,
    default: forwardRef(mockCaptcha),
  };
});

const mockConsole: jest.MockedFunction<typeof console.log> = jest.fn();
jest.spyOn(console, "error").mockImplementation(mockConsole);

describe("ForgotPasswordScreen", () => {
  const preloadedState: PreloadedState<RootState> = {
    ...initialState,
    verifyAuth: {
      verificationCodeId: "ver-code-id",
      verificationToken: "verification-token",
    },
  };
  beforeEach(() => {
    jest.mocked(ForgotPasswordEmailView).mockClear();
    jest.mocked(ForgotPasswordOTPView).mockClear();
    jest.mocked(ForgotPasswordResetPasswordView).mockClear();
    jest.mocked(mockRequestOTP).mockClear();
    jest.mocked(mockVerifyOTP).mockClear();
    jest.mocked(mockResendOTP).mockClear();
    jest.mocked(mockResetPassword).mockClear();
    jest.mocked(mockNavigateComponent).mockClear();
    jest.mocked(mockNavigate).mockClear();
    mockConsole.mockClear();
    mockCaptcha.mockImplementation(MockCaptcha);
  });

  test("render initial forgot password", async () => {
    renderRouteWithProviders([AppRoutes.ForgotPassword.render("initial")]);
    await waitForLazyLoad(screen);
  });

  test("render initial change password", async () => {
    renderRouteWithProviders([AppRoutes.ForgotPassword.render("initial")]);
    await waitForLazyLoad(screen);
  });

  test("render incorrect stage", async () => {
    renderRouteWithProviders([
      AppRoutes.LoginChangePassword.render("non-existent" as any),
    ]);
    await waitForLazyLoad(screen);

    expect(mockNavigateComponent).toBeCalledWith(
      expect.objectContaining({ to: AppRoutes.Home.path }),
      expect.anything()
    );
  });

  test("handle submit email", async () => {
    renderRouteWithProviders([AppRoutes.ForgotPassword.render("initial")]);
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordEmailView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockRequestOTP.mockResolvedValue({
      accessToken: "access-token",
      verCodeId: "ver-code-id",
      expiresIn: 900,
    });
    const { handleSubmit } = mockedView.mock.lastCall![0];
    act(() => {
      handleSubmit({ email: "abc@example.com" });
    });

    await waitFor(() => {
      expect(mockCaptcha).toBeCalledWith(
        expect.objectContaining({
          onLoad: expect.any(Function),
        }),
        expect.anything()
      );
    });

    await waitFor(() => {
      expect(mockRequestOTP).toBeCalledWith({
        email: "abc@example.com",
        captchaResponse: "captcha-response",
        captchaChannelCode: "channel-code",
      });
    });
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith(
        AppRoutes.ForgotPassword.render("verify"),
        expect.objectContaining({ state: { email: "abc@example.com" } })
      );
    });
  });

  test("handle submit email error", async () => {
    renderRouteWithProviders([AppRoutes.ForgotPassword.render("initial")]);
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordEmailView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockRequestOTP.mockRejectedValue(new Error("unknown error"));
    const { handleSubmit } = mockedView.mock.lastCall![0];
    act(() => {
      handleSubmit({ email: "abc@example.com" });
    });

    await waitFor(() => {
      expect(mockConsole).toHaveBeenCalled();
    });
    mockConsole.mockClear();
  });

  test("render otp", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.ForgotPassword.render("verify"),
          state: { email: "abc@example.com" },
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);
  });

  test("handle verify otp", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.ForgotPassword.render("verify"),
          state: { email: "abc@example.com" },
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordOTPView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockVerifyOTP.mockImplementation(async () => {
      return Promise.resolve();
    });
    const { onSubmit } = mockedView.mock.lastCall![0];
    act(() => {
      onSubmit({ otp: "123456" });
    });

    expect(mockVerifyOTP).toBeCalledWith({
      email: "abc@example.com",
      otp: "123456",
      verificationCodeId: "ver-code-id",
    });
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith(
        AppRoutes.ForgotPassword.render("password"),
        expect.objectContaining({ state: { email: "abc@example.com" } })
      );
    });
  });

  test("handle verify otp error", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.ForgotPassword.render("verify"),
          state: { email: "abc@example.com" },
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordOTPView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockVerifyOTP.mockRejectedValue(new Error("unknown error"));
    const { onSubmit } = mockedView.mock.lastCall![0];
    act(() => {
      onSubmit({ otp: "123456" });
    });

    await waitFor(() => {
      expect(mockConsole).toHaveBeenCalled();
    });
    mockConsole.mockClear();
  });

  test("handle resend otp", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.ForgotPassword.render("verify"),
          state: { email: "abc@example.com" },
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordOTPView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockResendOTP.mockImplementation(async () => {
      return Promise.resolve();
    });
    const { onResend } = mockedView.mock.lastCall![0];
    act(() => {
      onResend();
    });

    expect(mockResendOTP).toBeCalledWith({
      verificationCodeId: "ver-code-id",
    });
  });

  test("handle resend otp error", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.ForgotPassword.render("verify"),
          state: { email: "abc@example.com" },
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordOTPView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockResendOTP.mockRejectedValue(new Error("unknown error"));
    const { onResend } = mockedView.mock.lastCall![0];
    act(() => {
      onResend();
    });

    await waitFor(() => {
      expect(mockConsole).toHaveBeenCalled();
    });
    mockConsole.mockClear();
  });

  test("render reset", async () => {
    renderRouteWithProviders([AppRoutes.ForgotPassword.render("password")], {
      preloadedState,
    });
    await waitForLazyLoad(screen);
  });

  test("handle submit new password", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.LoginChangePassword.render("password"),
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordResetPasswordView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockResetPassword.mockImplementation(async () => {
      return Promise.resolve();
    });
    const { onSubmit } = mockedView.mock.lastCall![0];
    const val = "secret";
    act(() => {
      onSubmit({ newPassword: val, confirmPassword: val });
    });

    expect(mockResetPassword).toBeCalledWith({
      email: "", // No email needed for change password
      newPassword: val,
      verificationCodeId: "ver-code-id",
    });
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith(
        AppRoutes.LoginChangePassword.render("success"),
        expect.anything()
      );
    });
  });

  test("handle submit new password error", async () => {
    renderRouteWithProviders(
      [
        {
          pathname: AppRoutes.LoginChangePassword.render("password"),
        },
      ],
      {
        preloadedState,
      }
    );
    await waitForLazyLoad(screen);

    const mockedView = jest.mocked(ForgotPasswordResetPasswordView);
    await waitFor(() => {
      expect(mockedView).toHaveBeenCalled();
    });

    mockResetPassword.mockRejectedValue(new Error("unknown error"));
    const { onSubmit } = mockedView.mock.lastCall![0];
    const val = "secret";
    act(() => {
      onSubmit({ newPassword: val, confirmPassword: val });
    });

    await waitFor(() => {
      expect(mockConsole).toHaveBeenCalled();
    });
    mockConsole.mockClear();
  });

  test("render success", async () => {
    renderRouteWithProviders([AppRoutes.ForgotPassword.render("success")], {
      preloadedState,
    });
    await waitForLazyLoad(screen);
  });
});
