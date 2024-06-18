import { useSelector } from "react-redux";
import { deduceAPIAdminRole } from "frontend-common/src/apis/models/UserAccountDetails";
import { deduceAdminRole } from "frontend-common/src/utils/permission";

import mockUser from "../__fixtures__/user";
import { useRoutePermission } from "../providers/RequirePermissionRouteProvider";

import useCanAccess from "./useCanAccess";

jest.unmock("./useCanAccess");

jest.disableAutomock();

jest.mock("react", () => ({
  __esModule: true,
  ...jest.requireActual("react"),
  useMemo: jest.fn().mockImplementation((v) => v()),
}));

jest.mock("react-redux", () => ({
  __esModule: true,
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));
const mockUseSelector = useSelector as jest.Mock;

jest.mock("frontend-common/src/apis/models/UserAccountDetails", () => ({
  __esModule: true,
  deduceAPIAdminRole: jest.fn(),
}));
const mockDeduceAPIAdminRole = deduceAPIAdminRole as jest.Mock;

jest.mock("../providers/RequirePermissionRouteProvider", () => ({
  __esModule: true,
  useRoutePermission: jest.fn(),
}));
const mockUseRoutePermission = useRoutePermission as jest.Mock;
mockUseRoutePermission.mockReturnValue({
  groupNameCode: "g",
  permitNameCode: "p",
});

jest.mock("frontend-common/src/utils/permission", () => ({
  __esModule: true,
  ...jest.requireActual("frontend-common/src/utils/permission"),
  deduceAdminRole: jest.fn(),
  canAccess: jest.fn().mockReturnValue(true),
}));
const mockDeduceAdminRole = deduceAdminRole as jest.Mock;
mockDeduceAdminRole.mockReturnValue(null);

describe("useCanAccess", () => {
  test("no user", () => {
    expect(
      useCanAccess(
        undefined,
        () => true,
        () => true
      )
    ).toEqual(false);
  });

  test("no route permission", () => {
    mockUseRoutePermission.mockReturnValueOnce(null);
    expect(
      useCanAccess(
        mockUser as any,
        () => true,
        () => true
      )
    ).toEqual(true);
  });

  test("admin approver", () => {
    mockDeduceAdminRole.mockReturnValueOnce("Administration-Approver");
    mockDeduceAPIAdminRole.mockReturnValueOnce("admin-role");
    expect(
      useCanAccess(
        mockUser as any,
        () => true,
        () => true
      )
    ).toEqual(true);
  });

  test("admin preparer", () => {
    mockDeduceAdminRole.mockReturnValueOnce("Administration-Preparer");
    mockDeduceAPIAdminRole.mockReturnValueOnce("admin-role");
    expect(
      useCanAccess(
        mockUser as any,
        () => true,
        () => true
      )
    ).toEqual(true);
  });

  test("user, no selected scheme", () => {
    mockUseSelector.mockReturnValueOnce(null);
    expect(
      useCanAccess(
        mockUser as any,
        () => true,
        () => true
      )
    ).toEqual(true);
  });

  test("user, have selected scheme", () => {
    mockUseSelector.mockReturnValue("scheme");
    expect(
      useCanAccess(
        mockUser as any,
        () => true,
        () => true
      )
    ).toEqual(true);
  });
});
