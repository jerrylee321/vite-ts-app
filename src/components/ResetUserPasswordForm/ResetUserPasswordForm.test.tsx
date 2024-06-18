import "@testing-library/jest-dom";
import "../../i18n";
import { act, fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import ResetUserPasswordForm, { SystemResetUserPasswordForm } from ".";

describe("Reset User Password Form", () => {
  test("should able render the form", async () => {
    renderWithProviders(
      <ResetUserPasswordForm
        userId="mock user id"
        username="mock username"
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(/Password Reset/)).toBeInTheDocument();
  });

  test("should able render the form with login name", async () => {
    renderWithProviders(
      <ResetUserPasswordForm
        loginName="mock loginName"
        username="mock username"
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(/Password Reset/)).toBeInTheDocument();
    expect(screen.getByText(/^mock loginName$/)).toBeInTheDocument();
  });

  test("should not able to submit the form when password not match", async () => {
    renderWithProviders(
      <ResetUserPasswordForm
        userId="mock user id"
        username="mock username"
        onSubmit={jest.fn()}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("newPassword").children[0], {
        target: { value: "newpass" },
      });
      fireEvent.change(screen.getByTestId("confirmPassword").children[0], {
        target: { value: "oldpass" },
      });
      fireEvent.click(screen.getByTestId("FormSubmitButton"));
    });

    expect(
      screen.getAllByText(/Password does not match/).length
    ).toBeGreaterThan(0);
  });
  test("should be able submit the form when password pass", async () => {
    const mockSubmit = jest.fn();
    renderWithProviders(
      <ResetUserPasswordForm
        userId="mock user id"
        username="mock username"
        onSubmit={mockSubmit}
      />
    );

    await act(async () => {
      fireEvent.change(screen.getByTestId("newPassword").children[0], {
        target: { value: "newpass" },
      });
      fireEvent.change(screen.getByTestId("confirmPassword").children[0], {
        target: { value: "newpass" },
      });
      fireEvent.click(screen.getByTestId("FormSubmitButton"));
    });

    expect(mockSubmit).toBeCalled();
  });
});

describe("System Reset User Password Form", () => {
  test("should able render the form", async () => {
    renderWithProviders(
      <SystemResetUserPasswordForm
        userId="mock user id"
        username="mock username"
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(/Password Reset/)).toBeInTheDocument();
  });

  test("should able render the form with login name", async () => {
    renderWithProviders(
      <SystemResetUserPasswordForm
        loginName="mock loginName"
        username="mock username"
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByText(/Password Reset/)).toBeInTheDocument();
    expect(screen.getByText(/^mock loginName$/)).toBeInTheDocument();
  });
});
