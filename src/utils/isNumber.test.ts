import { isNumber } from "./isNumber";

describe("isNumber", () => {
  it("should fail if value is not a number", async () => {
    expect(isNumber("a string")).toEqual(false);
  });
  it("should fail if value is not finite", async () => {
    expect(isNumber(Number.POSITIVE_INFINITY)).toEqual(false);
  });
  it("should be true for finite number", async () => {
    expect(isNumber(888)).toEqual(true);
  });
});
