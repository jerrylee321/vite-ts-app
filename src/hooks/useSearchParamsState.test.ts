import { renderHook } from "@testing-library/react";

import useSearchParamsState from "./useSearchParamsState";

jest.mock("./useSearchParamsSerializedState", () => () => [null, jest.fn()]);

describe("useSearchParamsState", () => {
  it("should return value from url search params", () => {
    const { result } = renderHook(() => useSearchParamsState("key"));

    const [value, _] = result.current;

    expect(value).toBeNull();
  });
});
