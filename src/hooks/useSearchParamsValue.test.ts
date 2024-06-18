import { act } from "react-dom/test-utils";
import { useSearchParams } from "react-router-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { stringify } from "superjson";

import useSearchParamsValue from "./useSearchParamsValue";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
}));

describe("useSearchParamsValue", () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockUseSearchParams.mockReset();
  });

  it("should return value from url search params", async () => {
    const mockSearchParams = new URLSearchParams();
    mockSearchParams.set("key", stringify("newValue"));

    mockUseSearchParams.mockReturnValue([mockSearchParams, jest.fn()]);
    const { result } = renderHook(() =>
      useSearchParamsValue({
        key: "key",
        initValue: "initValue",
        isReadOnly: false,
      })
    );

    await act(async () => {
      const [value, setValue] = result.current;
      setValue("newValue");
      await waitFor(() => {
        expect(value).toBe("newValue");
      });
    });
  });
});
