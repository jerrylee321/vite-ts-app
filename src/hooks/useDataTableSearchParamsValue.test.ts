import { useSearchParams } from "react-router-dom";
import { renderHook } from "@testing-library/react";
import { stringify } from "superjson";

import useDataTableSearchParamsValue from "./useDataTableSearchParamsValue";

const mockReturnValue = {
  sortBy: [],
  pageIndex: 0,
  pageSize: 50,
};

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

describe("useDataTableSearchParamsValue", () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;
  const mockSearchParams = new URLSearchParams();
  mockSearchParams.set("key", stringify(mockReturnValue));
  mockUseSearchParams.mockReturnValue([mockSearchParams, jest.fn()]);

  it("should return value from url search params", () => {
    const { result } = renderHook(() => useDataTableSearchParamsValue("key"));

    const [value, _] = result.current;

    expect(mockUseSearchParams).toBeCalled();
    expect(value).toEqual(mockReturnValue);
  });
});
