import { waitFor } from "@testing-library/react";

import { CustomError } from "../models/errors";
import { useErrorAlert } from "../providers/ErrorAlertProvider";
import { renderHookWithProviders } from "../utils/test/render";

import { useValidationErrorDialog } from "./useValidationErrorDialog";

jest.mock("../providers/ErrorAlertProvider", () => ({
  __esModule: true,
  ...jest.requireActual("../providers/ErrorAlertProvider"),
  useErrorAlert: jest.fn().mockReturnValue({
    show: jest.fn(),
  }),
}));

const mockFormikError = "ValidationErrorDialog.test.error";
const mockFormikErrorList = [
  "ValidationErrorDialog.title",
  "ValidationErrorDialog.test.error",
];
const mockFormikObjectError = {};

describe("useValidationErrorDialog", () => {
  const mockShowAlert = useErrorAlert().show as jest.Mock;

  it("should call showError with correct param", async () => {
    const { result } = renderHookWithProviders(
      () => useValidationErrorDialog(),
      { authenticated: true }
    );

    result.current.showValidationErrorDialog([mockFormikError, undefined]);

    await waitFor(() => {
      expect(mockShowAlert).toBeCalledWith(
        new CustomError("Test error", {
          title: "Validation Error",
        })
      );
    });

    mockShowAlert.mockReset();
    result.current.showValidationErrorDialog([mockFormikErrorList]);

    await waitFor(() => {
      expect(mockShowAlert).toBeCalledWith(
        new CustomError("Validation Error\nTest error", {
          title: "Validation Error",
        })
      );
    });

    mockShowAlert.mockReset();
    result.current.showValidationErrorDialog([
      [mockFormikObjectError],
      mockFormikObjectError,
    ]);

    await waitFor(() => {
      expect(mockShowAlert).not.toBeCalled();
    });
  });
});
