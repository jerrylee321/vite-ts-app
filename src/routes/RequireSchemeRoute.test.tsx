const mockNavigate = jest.fn();

import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { testUser } from "../utils/test/auth";
import { renderWithProviders } from "../utils/test/render";

import RequireSchemeRoute from "./RequireSchemeRoute";

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    Navigate: mockNavigate,
  };
});

describe("require scheme route", () => {
  test("should allow if a scheme is selected", async () => {
    await act(async () => {
      renderWithProviders(
        <RequireSchemeRoute>
          <div role="text">Hello World</div>
        </RequireSchemeRoute>,
        {
          preloadedState: {
            scheme: {
              selectedScheme: {
                schemeCode: "SCHEME_CODE",
                schemeName: "SCHEME_NAME",
                schemeRegNo: "SCHEME_REG_NO",
                schemeUuid: "SCHEME_UUID",
                trusteeCode: "TR_CODE",
                trusteeName: "TRUSTEE_NAME",
                trusteeUuid: "TR_UUID",
              },
            },
          },
          authenticated: testUser,
        }
      );
    });
    expect(screen.getByRole("text")).toHaveTextContent(/hello world/i);
  });

  test("should redirect if no scheme selected", async () => {
    renderWithProviders(
      <RequireSchemeRoute>
        <div role="text">Hello World</div>
      </RequireSchemeRoute>,
      {
        authenticated: testUser,
        preloadedState: {
          scheme: { selectedScheme: null },
        },
      }
    );

    expect(mockNavigate).toBeCalledWith(
      {
        to: "/select-scheme",
      },
      expect.anything()
    );
  });
});
