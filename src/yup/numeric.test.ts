import { numericSchema } from "./numeric";

test("numericSchema", async () => {
  expect(await numericSchema(4, 2).isValid("")).toEqual(true);
  expect(await numericSchema(4, 2).isValid(123.44444)).toEqual(false);
  expect(await numericSchema(4, 2).isValid(12.44)).toEqual(true);
});
