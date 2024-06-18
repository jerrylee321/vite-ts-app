import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { testUser } from "../utils/test/auth";
import { renderWithProviders } from "../utils/test/render";

import RequirePermissionRouteProvider from "./RequirePermissionRouteProvider";

describe("RequirePermissionRouteProvider", () => {
  test("should render children", async () => {
    await act(async () => {
      renderWithProviders(
        <RequirePermissionRouteProvider
          groupNameCode="GroupNameCode"
          permitNameCode="PermitNameCode"
        >
          <div role="text">Hello World</div>
        </RequirePermissionRouteProvider>,
        {
          authenticated: testUser,
          selectedScheme: {
            schemeCode: "SCHEME_CODE",
            schemeName: "SCHEME_NAME",
            schemeRegNo: "SCHEME_REG_NO",
            schemeUuid: "SCHEME_UUID",
            trusteeCode: "TR_CODE",
            trusteeName: "TRUSTEE_NAME",
            trusteeUuid: "TR_UUID",
          },
        }
      );
    });
    expect(screen.getByRole("text")).toHaveTextContent(/hello world/i);
  });
});
