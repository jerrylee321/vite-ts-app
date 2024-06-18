import { useTranslation } from "react-i18next";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { FormikErrors } from "formik";

import useLocalizedErrors from "./useLocalizedErrors";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

interface MockErrorsFormModel {
  mock1: string;
  mock2: string;
  mock3: {
    mock31: string;
    mock32: {
      mock321: string;
      mock322: string;
    };
    mock33: string;
  };
}

const mockErrors: FormikErrors<MockErrorsFormModel> = {
  mock1: "mock",
  mock2: "mock",
  mock3: {
    mock31: "mock",
    mock32: {
      mock321: "mock",
      mock322: "mock",
    },
    mock33: "mock",
  },
};

describe("useLocalizedErrors", () => {
  const mockUseTranslation = useTranslation as jest.Mock;
  it("should localize errors recursively", async () => {
    const mockT = jest.fn();
    mockUseTranslation.mockReturnValue({
      t: mockT,
    });

    renderHook(() => useLocalizedErrors(mockErrors));

    expect(mockT).toHaveBeenCalledTimes(6);
  });
});
