import {
  startOfDayInZone,
  yesterdayDateInDefaultZone,
  yesterdayDateInZone,
} from "./time";

describe("startOfDayInZone", () => {
  test("yesterday if converted to UTC", () => {
    // NOTE:
    // * 9am on 31st in UTC = 5pm on 31st in HKT
    // * start of day is midnight on 31st in HKT
    // * midnight on 31st in HKT = 4pm on 30th in UTC
    expect(
      startOfDayInZone(new Date("2023-08-31T09:25:55.162Z"), "Asia/Hong_Kong")
    ).toEqual(new Date("2023-08-30T16:00:00.000Z"));
  });

  test("same day if converted to UTC", () => {
    expect(
      startOfDayInZone(new Date("2023-08-31T22:25:55.162Z"), "Asia/Hong_Kong")
    ).toEqual(new Date("2023-08-31T16:00:00.000Z"));
  });
});

describe("yesterdayDateInZone", () => {
  test("yesterday if converted to UTC", () => {
    expect(
      yesterdayDateInZone(
        new Date("2023-08-31T22:25:55.162Z"),
        "Asia/Hong_Kong"
      )
    ).toEqual(new Date("2023-08-30T16:00:00.000Z"));
  });
  test("day before yesterday if converted to UTC", () => {
    // NOTE:
    // * 9am on 31st in UTC = 5pm on 31st in HKT
    // * start of day is midnight on 31st in HKT
    // * midnight on 31st in HKT = 4pm on 30th in UTC
    expect(
      yesterdayDateInZone(
        new Date("2023-08-31T09:25:55.162Z"),
        "Asia/Hong_Kong"
      )
    ).toEqual(new Date("2023-08-29T16:00:00.000Z"));
  });
});

describe("yesterdayDateInDefaultZone", () => {
  test("yesterday if converted to UTC", () => {
    expect(
      yesterdayDateInDefaultZone(new Date("2023-08-31T22:25:55.162Z"))
    ).toEqual(new Date("2023-08-30T00:00:00.000Z"));
    expect(
      yesterdayDateInDefaultZone(new Date("2023-08-31T09:25:55.162Z"))
    ).toEqual(new Date("2023-08-30T00:00:00.000Z"));
  });
});
