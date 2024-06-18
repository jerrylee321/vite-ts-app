const mockShowErrorAlert = jest.fn();

import { act } from "react-dom/test-utils";
import { screen, waitFor, within } from "@testing-library/react";

import {
  initialResult,
  passwordIsValidResult,
} from "../../models/CommonAuthentication";
import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import AuthChangePasswordForm from "./AuthChangePasswordForm";

jest.mock("../../providers/ErrorAlertProvider", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../providers/ErrorAlertProvider"),
    useErrorAlert: jest.fn(() => {
      return { show: mockShowErrorAlert };
    }),
  };
});

describe("AuthChangePasswordForm", () => {
  const mockOnPasswordValidate = jest.fn();
  const user = setupUserEvent();

  beforeEach(() => {
    mockOnPasswordValidate.mockClear();
  });

  it("render password hint list", async () => {
    renderWithProviders(
      <AuthChangePasswordForm
        isSubmitting={false}
        isPasswordValidating={false}
        passwordValidationResult={{
          ...initialResult,
          uppercase: false,
          lowercase: true,
        }}
        onPasswordValidate={mockOnPasswordValidate}
        onSubmit={jest.fn()}
        portal="mpfa"
        isPasswordValid={false}
      />
    );

    screen.getByTestId("newPassword").querySelector("input")!.focus();
    await user.paste("anything");

    const uppercase = await screen.findByTestId(
      "AuthRequirementHint-uppercase"
    );
    expect(within(uppercase).getByTestId("icon")).toHaveAttribute(
      "aria-label",
      "Invalid"
    );

    const lowercase = await screen.findByTestId(
      "AuthRequirementHint-lowercase"
    );
    expect(within(lowercase).getByTestId("icon")).toHaveAttribute(
      "aria-label",
      "Valid"
    );
  });

  it("with new password not satisfying requirement", async () => {
    renderWithProviders(
      <AuthChangePasswordForm
        isSubmitting={false}
        isPasswordValidating={false}
        passwordValidationResult={initialResult}
        onPasswordValidate={mockOnPasswordValidate}
        onSubmit={jest.fn()}
        portal="mpfa"
        isPasswordValid={false}
      />
    );

    const value = "hello#world#123";
    await act(async () => {
      screen.getByTestId("newPassword").querySelector("input")!.focus();
      await user.paste(value);
      screen.getByTestId("confirmPassword").querySelector("input")!.focus();
      await user.paste(value);
      screen.getByTestId("confirmPassword").querySelector("input")!.blur();
    });

    expect(mockOnPasswordValidate).toBeCalledWith(value);

    expect(
      screen.queryByTestId("AuthRequirementHint-unmatch")
    ).not.toBeInTheDocument();
  });

  it("with confirm password not matching new password", async () => {
    renderWithProviders(
      <AuthChangePasswordForm
        isSubmitting={false}
        isPasswordValidating={false}
        passwordValidationResult={passwordIsValidResult}
        onPasswordValidate={mockOnPasswordValidate}
        onSubmit={jest.fn()}
        portal="mpfa"
        isPasswordValid={true}
      />
    );

    await act(async () => {
      screen.getByTestId("newPassword").querySelector("input")!.focus();
      await user.paste("hello#world#A");
      screen.getByTestId("confirmPassword").querySelector("input")!.focus();
      await user.paste("hello#world#1");
      screen.getByTestId("confirmPassword").querySelector("input")!.blur();
    });

    const unmatch = await screen.findByTestId("AuthRequirementHint-unmatch");
    expect(within(unmatch).getByTestId("icon")).toHaveAttribute(
      "aria-label",
      "Invalid"
    );
  });

  it("submit successfully", async () => {
    const onSubmit = jest.fn();
    renderWithProviders(
      <AuthChangePasswordForm
        isSubmitting={false}
        isPasswordValidating={false}
        passwordValidationResult={passwordIsValidResult}
        onPasswordValidate={mockOnPasswordValidate}
        onSubmit={onSubmit}
        portal="mpfa"
        isPasswordValid={true}
      />
    );

    await act(async () => {
      screen.getByTestId("password").querySelector("input")!.focus();
      await user.paste("oldPassword");
      screen.getByTestId("newPassword").querySelector("input")!.focus();
      await user.paste("hello#world#1A");
      screen.getByTestId("confirmPassword").querySelector("input")!.focus();
      await user.paste("hello#world#1A");
      screen.getByTestId("confirmPassword").querySelector("input")!.blur();
    });

    const submitButton = await screen.findByTestId("submitButton");
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(screen.getByTestId("submitButton"));

    const p = "oldPassword";
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        confirmPassword: "hello#world#1A",
        newPassword: "hello#world#1A",
        password: p,
      }),
      expect.anything()
    );
  });

  it("submit when old password and new password are the same", async () => {
    const onSubmit = jest.fn();
    renderWithProviders(
      <AuthChangePasswordForm
        isSubmitting={false}
        isPasswordValidating={false}
        passwordValidationResult={passwordIsValidResult}
        onPasswordValidate={mockOnPasswordValidate}
        onSubmit={onSubmit}
        portal="mpfa"
        isPasswordValid={true}
      />
    );

    await act(async () => {
      screen.getByTestId("password").querySelector("input")!.focus();
      await user.paste("hello#world#1A");
      screen.getByTestId("newPassword").querySelector("input")!.focus();
      await user.paste("hello#world#1A");
      screen.getByTestId("confirmPassword").querySelector("input")!.focus();
      await user.paste("hello#world#1A");
      screen.getByTestId("confirmPassword").querySelector("input")!.blur();
    });

    const submitButton = await screen.findByTestId("submitButton");
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(screen.getByTestId("submitButton"));

    expect(mockShowErrorAlert).toBeCalled();
    expect(onSubmit).not.toBeCalled();
  });
});
