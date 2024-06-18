import { defaultTimeZone } from "../models/time";

import formatDateRange from "./formatDateRange";

test("formatDateRange", () => {
  expect(
    formatDateRange(
      [new Date("2022-02-01"), new Date("2023-03-01")],
      defaultTimeZone,
      "dd/MM/yyyy"
    )
  ).toEqual("01/02/2022 - 01/03/2023");

  expect(
    formatDateRange(
      [new Date("2022-02-01"), new Date("2023-03-01")],
      defaultTimeZone,
      "dd/MM/yyyy",
      "***"
    )
  ).toEqual("01/02/2022***01/03/2023");
});
