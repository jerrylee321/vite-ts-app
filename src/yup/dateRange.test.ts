import dateRange from "./dateRange";

test("dateRange", async () => {
  expect(await dateRange().isValid([null, null])).toEqual(true);
  expect(await dateRange().isValid([null, new Date()])).toEqual(false);
  expect(await dateRange().isValid([new Date(), new Date()])).toEqual(true);
  expect(await dateRange(true).isValid([new Date(), new Date()])).toEqual(true);
});
