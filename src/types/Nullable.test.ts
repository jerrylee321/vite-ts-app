import { fallback, isNonNullable } from "./Nullable";

test("isNonNullable", () => {
  expect(isNonNullable(1)).toEqual(true);
  expect(isNonNullable(0)).toEqual(true);
  expect(isNonNullable(null)).toEqual(false);
});

test("fallback", () => {
  expect(fallback<string | null>("a", "b")).toEqual("a");
  expect(fallback<string | null>(null, "b")).toEqual("b");
});
