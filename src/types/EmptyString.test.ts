import { fallbackEmptyString } from "./EmptyString";

test("fallbackEmptyString", () => {
  expect(fallbackEmptyString("a", "b")).toEqual("a");
  expect(fallbackEmptyString("", "b")).toEqual("b");
  expect(fallbackEmptyString("a")).toEqual("a");
  expect(fallbackEmptyString("")).toEqual(undefined);
});
