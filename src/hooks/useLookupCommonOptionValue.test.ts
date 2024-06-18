import { renderHookWithProviders } from "../utils/test/render";

import useLookupCommonOptionValue from "./useLookupCommonOptionValue";

test("useLookupCommonOptionValue", () => {
  const {
    result: { current: translate },
  } = renderHookWithProviders(() =>
    useLookupCommonOptionValue([
      {
        key: "key1",
        name: "name1",
      },
      {
        key: "key2",
        name: "name2",
      },
    ])
  );

  expect(translate("key1")).toEqual("name1");
  expect(translate("key2")).toEqual("name2");
  expect(translate("key3")).toEqual("key3");
  expect(translate(null)).toEqual(null);
});
