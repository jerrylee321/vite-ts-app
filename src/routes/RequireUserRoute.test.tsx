import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { initialState } from "../redux";
import authReducer, { error as authError } from "../redux/auth";
import { testUser } from "../utils/test/auth";
import { renderWithProviders } from "../utils/test/render";

import RequireUserRoute from "./RequireUserRoute";

// This mock is only required because we check if `login` is called.
// Change `preloadedState` to change authentication state.
const mockAuthenticate = jest.fn();
jest.mock("../providers/AuthProvider", () => {
  const originalModule = jest.requireActual("../providers/AuthProvider");
  return {
    __esModule: true,
    ...originalModule,
    useAuth: jest.fn().mockImplementation(() => ({
      ...originalModule.useAuth(),
      authenticate: mockAuthenticate,
    })),
  };
});

describe("protected route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should block unauthenticated user", async () => {
    await act(async () => {
      renderWithProviders(
        <div role="text">
          <RequireUserRoute>Hello Protected World</RequireUserRoute>
        </div>,
        {
          authenticated: false,
        }
      );
    });
    expect(screen.getByRole("text")).not.toHaveTextContent(
      /hello protected world/i
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(mockAuthenticate).toBeCalled();
  });

  test("should handle error", async () => {
    await act(async () => {
      renderWithProviders(
        <div role="text">
          <RequireUserRoute>Hello Protected World</RequireUserRoute>
        </div>,
        {
          preloadedState: {
            ...initialState,
            auth: authReducer(undefined, authError(new Error())),
          },
        }
      );
    });
    expect(screen.queryByText(/hello protected world/i)).toBeNull();
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
    expect(mockAuthenticate).not.toBeCalled();
  });

  test("should allow authenticated user", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireUserRoute>
          <div role="text">Hello World</div>
        </RequireUserRoute>,
        {
          authenticated: testUser,
        }
      );
    });
    expect(screen.getByRole("text")).toHaveTextContent(/hello world/i);
    expect(mockAuthenticate).not.toBeCalled();
  });
});
