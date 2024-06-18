import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import AppProviders from "../providers/AppProviders";
import QueryKeys from "../queries/QueryKeys";
import useQueryUserAccountDetails from "../queries/useQueryUserAccountDetails";
import { testUser } from "../utils/test/auth";
import { getErrorQueryState } from "../utils/test/queries";
import {
  appProvidersPropsWithOptions,
  renderWithProviders,
} from "../utils/test/render";

import RequireUserAccountRoute from "./RequireUserAccountRoute";

describe("protected route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should handle error", async () => {
    const mockConsole = jest.fn();
    jest.spyOn(console, "error").mockImplementation(mockConsole);
    const appProvidersProps = appProvidersPropsWithOptions({
      authenticated: {
        name: "John Doe",
        email: "johndoe@example.com",
        username: "johndoe@example.com",
        role: "User",
        userID: "08c27caa-335a-44df-bdea-2d8f44024601",
      },
    });
    const { queryClient } = appProvidersProps;
    const queryCache = queryClient.getQueryCache();
    queryCache.clear();
    queryCache.build(
      queryClient,
      {
        queryKey: QueryKeys.userAccountDetails(
          "08c27caa-335a-44df-bdea-2d8f44024601"
        ),
      },
      getErrorQueryState(new Error())
    );

    await act(async () => {
      render(
        <div role="text">
          <RequireUserAccountRoute
            useQueryUserAccountDetails={useQueryUserAccountDetails}
          >
            Hello Protected World
          </RequireUserAccountRoute>
        </div>,
        {
          wrapper: ({ children }) => (
            <AppProviders {...appProvidersProps}>
              <MemoryRouter>{children}</MemoryRouter>
            </AppProviders>
          ),
        }
      );
    });
    expect(screen.queryByText(/hello protected world/i)).toBeNull();
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
    expect(mockConsole).toBeCalled();
  });

  test("should allow authenticated user", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireUserAccountRoute
          useQueryUserAccountDetails={useQueryUserAccountDetails}
        >
          <div role="text">Hello World</div>
        </RequireUserAccountRoute>,
        {
          authenticated: testUser,
        }
      );
    });
    expect(screen.getByRole("text")).toHaveTextContent(/hello world/i);
  });
});
