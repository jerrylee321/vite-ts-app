import { renderHook } from "@testing-library/react";

import useTimeZone from "./useTimeZone";

test("useTimeZone", () => {
  const { result } = renderHook(() => useTimeZone());
  expect(result.current).toEqual("Etc/UTC");
});
