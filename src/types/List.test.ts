import { isNonEmptyList } from "./List";

test("isNonEmptyList", () => {
  expect(isNonEmptyList([])).toEqual(false);
  expect(isNonEmptyList([1])).toEqual(true);
});
