import { Row } from "react-table";

import nullOnlySorting from "./nullOnlySorting";

const nullRow = { values: { test: null } } as unknown as Row;
const nonNullRow = { values: { test: {} } } as unknown as Row;

test("nullOnlySorting", () => {
  expect(nullOnlySorting(nullRow, nonNullRow, "test")).toEqual(-1);
  expect(nullOnlySorting(nonNullRow, nullRow, "test")).toEqual(1);
  expect(nullOnlySorting(nullRow, nullRow, "test")).toEqual(0);
  expect(nullOnlySorting(nonNullRow, nonNullRow, "test")).toEqual(0);
});
