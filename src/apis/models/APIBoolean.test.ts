import { APIBooleanInputSchema, APIBooleanSchema } from "./APIBoolean";

test("APIBooleanSchema transform", () => {
  expect(APIBooleanSchema.parse("Y")).toEqual(true);
  expect(APIBooleanSchema.parse("N")).toEqual(false);
});

test("APIBooleanInputSchema transform", () => {
  expect(APIBooleanInputSchema.parse(true)).toEqual("Y");
  expect(APIBooleanInputSchema.parse(false)).toEqual("N");
});
