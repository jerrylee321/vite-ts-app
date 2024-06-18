const mockShowError = jest.fn();

import { Navigate } from "react-router-dom";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../utils/test/render";

import NoPermissionNavigate from "./NoPermissionNavigate";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(),
}));

jest.mock("../providers/ErrorAlertProvider", () => ({
  __esModule: true,
  ...jest.requireActual("../providers/ErrorAlertProvider"),
  useErrorAlert: jest.fn().mockReturnValue({
    show: mockShowError,
  }),
}));

describe("NoPermissionNavigate", () => {
  test("should redirect", async () => {
    renderWithProviders(<NoPermissionNavigate to="/example" />);

    expect(jest.mocked(Navigate)).toBeCalledWith(
      expect.objectContaining({ to: "/example" }),
      expect.anything()
    );

    expect(mockShowError).toBeCalled();
  });
});
