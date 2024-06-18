import { date, mixed, number, string } from "yup";

import i18n from "../i18n";
import { defaultTimeZone } from "../models/time";

import { setFormikLocale } from "./formLocale";
import { startOfDayInZone } from "./time";

setFormikLocale(i18n);

test("mixed required", () => {
  const schema = mixed().required();
  expect(() => schema.validateSync(null)).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining("This field is required"),
    })
  );
});

test("string max", () => {
  const schema = string().max(4);
  expect(() => schema.validateSync("12345")).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining("This field is too long"),
    })
  );
});

test("string min", () => {
  const schema = string().min(4);
  expect(() => schema.validateSync("123")).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining("This field is too short"),
    })
  );
});

test("string length", () => {
  const schema = string().length(4);
  expect(() => schema.validateSync("123")).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field must be exactly 4 characters"
      ),
    })
  );
});

test("string matches", () => {
  const schema = string().matches(/4/);
  expect(() => schema.validateSync("123")).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field does not match required pattern"
      ),
    })
  );
});

test("string hkid", () => {
  const schema = string().hkid();
  expect(() => schema.validateSync("A123")).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining("This field is not a valid HKID"),
    })
  );
});

test("number positive", () => {
  const schema = number().positive();
  expect(() => schema.validateSync(-1)).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining("This field must be a positive number"),
    })
  );
});

test("date max", () => {
  const schema = date().max(
    startOfDayInZone(new Date("2023-03-02"), defaultTimeZone)
  );
  expect(() => schema.validateSync(new Date("2023-03-03"))).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field must not be later than 02/03/2023"
      ),
    })
  );
});

test("date min", () => {
  const schema = date().min(
    startOfDayInZone(new Date("2023-03-02"), defaultTimeZone)
  );
  expect(() => schema.validateSync(new Date("2023-03-01"))).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field must not be earlier than 02/03/2023"
      ),
    })
  );
});

test("date min today", () => {
  jest.useFakeTimers().setSystemTime(new Date("2023-03-02 11:23:45"));
  const schema = date().min(
    startOfDayInZone(new Date("2023-03-02"), defaultTimeZone)
  );
  expect(() => schema.validateSync(new Date("2023-03-01"))).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field must not be earlier than today"
      ),
    })
  );
});

test("date min tomorrow", () => {
  jest.useFakeTimers().setSystemTime(new Date("2023-03-01 11:23:45"));
  const schema = date().min(
    startOfDayInZone(new Date("2023-03-02"), defaultTimeZone)
  );
  expect(() => schema.validateSync(new Date("2023-03-01"))).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field must not be earlier than tomorrow"
      ),
    })
  );
});

test("date min string", () => {
  const schema = date().min("12 October 2023");
  expect(() => schema.validateSync(new Date("2023-03-01"))).toThrowError(
    expect.objectContaining({
      message: expect.stringContaining(
        "This field must not be earlier than 12 October 2023"
      ),
    })
  );
});
