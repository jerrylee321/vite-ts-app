import {
  APIDateResponseSchema,
  APIDateSchema,
  APIDateTimeSchema,
  APIDayFirstDateRequestSchema,
  APIDayFirstDateSchema,
  APINullableDayFirstDateRequestSchema,
} from "./APIDate";

test("APIDate transform", () => {
  expect(APIDateSchema.parse(new Date("2023-01-01"))).toEqual("2023-01-01");
  expect(APIDateSchema.parse(new Date("2023-01-02"))).toEqual("2023-01-02");
});

test("APIDateTime transform", () => {
  expect(APIDateTimeSchema.parse(new Date("2023-01-01T12:34:56.123Z"))).toEqual(
    "2023-01-01T12:34:56+0000"
  );
  expect(
    APIDateTimeSchema.parse(new Date("2023-01-01T20:34:56.123+08:00"))
  ).toEqual("2023-01-01T12:34:56+0000");
});

test("APIDateNonNullableResponse", () => {
  expect(APIDateResponseSchema.parse("2023-01-01")).toEqual(
    new Date("2023-01-01")
  );
  expect(APIDateResponseSchema.safeParse(null).success).toEqual(false);
  expect(APIDateResponseSchema.nullable().parse(null)).toEqual(null);
});

test("APIDayFirstDateRequestSchema", () => {
  expect(
    APIDayFirstDateRequestSchema.parse(new Date("2023-04-16T00:00:00"))
  ).toEqual("16/04/2023");
});

test("APINullableDateStringRequestSchema", () => {
  expect(
    APINullableDayFirstDateRequestSchema.parse(new Date("2023-04-16T00:00:00"))
  ).toEqual("16/04/2023");
  expect(APINullableDayFirstDateRequestSchema.parse(null)).toEqual(null);
});

test("APIDayFirstDateSchema", () => {
  expect(APIDayFirstDateSchema.parse("01/12/2022")).toEqual(
    new Date("2022-12-01")
  );
  expect(APIDayFirstDateSchema.parse("01122022")).toEqual(
    new Date("2022-12-01")
  );
  expect(() => APIDayFirstDateSchema.parse("NOT_VALID_DATE_STRING")).toThrow();
});
