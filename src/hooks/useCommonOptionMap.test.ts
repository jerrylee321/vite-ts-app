import { renderHook } from "@testing-library/react";

import useCommonOptionMap from "./useCommonOptionMap";

test("useCommonOptionMap", () => {
  const { result } = renderHook(useCommonOptionMap, {
    initialProps: [
      {
        key: "testKey",
        name: "testName",
      },
    ],
  });
  expect(result.current.get("testKey")).toEqual("testName");
});
