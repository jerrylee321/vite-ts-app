import { useSelector } from "react-redux";

import { SelectedScheme } from "../redux/scheme";

import useSelectedScheme from "./useSelectedScheme";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("useSelectedScheme", () => {
  const mockUseSelector = useSelector as jest.Mock;
  it("should return selected scheme", () => {
    const mockSelectedScheme: SelectedScheme = {
      schemeCode: "code",
      schemeName: "mockName",
      schemeRegNo: "regNo",
      schemeUuid: "uuid",
      trusteeCode: "trCode",
      trusteeName: "mockTrusteeName",
      trusteeUuid: "trUuid",
    };
    mockUseSelector.mockReturnValue(mockSelectedScheme);
    expect(useSelectedScheme()).toEqual(mockSelectedScheme);
  });
  it("should throw error when there is no selected scheme", () => {
    mockUseSelector.mockReturnValue(false);
    expect(useSelectedScheme).toThrowError();
  });
});
