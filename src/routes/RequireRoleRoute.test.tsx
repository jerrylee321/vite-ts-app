import { act } from "react-dom/test-utils";
import { Navigate } from "react-router-dom";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { UserAccountDetail } from "../apis/models/UserAccountDetails";
import { renderWithProviders } from "../utils/test/render";

import RequireRoleRoute from "./RequireRoleRoute";

jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
}));
const mockNavigate = jest.mocked(Navigate);

describe("require role route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should allow admin", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireRoleRoute role="admin" redirect="/example">
          <div role="text">Hello World</div>
        </RequireRoleRoute>,
        {
          userAccountDetail: {
            role: "ADMIN_APPROVER",
          } as UserAccountDetail,
        }
      );
    });
    expect(screen.getByRole("text")).toHaveTextContent(/hello world/i);
    expect(mockNavigate).not.toBeCalled();
  });

  test("should not allow admin", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireRoleRoute role="user" redirect="/example">
          <div role="text">Hello World</div>
        </RequireRoleRoute>,
        {
          userAccountDetail: {
            role: "ADMIN_APPROVER",
          } as UserAccountDetail,
        }
      );
    });
    expect(screen.queryByRole("text")).not.toBeInTheDocument();
    expect(mockNavigate).toBeCalledWith(
      expect.objectContaining({
        to: "/example",
      }),
      expect.anything()
    );
  });

  test("should allow user", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireRoleRoute role="user" redirect="/example">
          <div role="text">Hello World</div>
        </RequireRoleRoute>,
        {
          userAccountDetail: {
            role: null,
          } as UserAccountDetail,
        }
      );
    });
    expect(screen.getByRole("text")).toHaveTextContent(/hello world/i);
    expect(mockNavigate).not.toBeCalled();
  });

  test("should not allow user", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireRoleRoute role="admin" redirect="/example">
          <div role="text">Hello World</div>
        </RequireRoleRoute>,
        {
          userAccountDetail: {
            role: null,
          } as UserAccountDetail,
        }
      );
    });
    expect(screen.queryByRole("text")).not.toBeInTheDocument();
    expect(mockNavigate).toBeCalledWith(
      expect.objectContaining({
        to: "/example",
      }),
      expect.anything()
    );
  });
});
