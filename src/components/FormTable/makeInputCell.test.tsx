import { trimNumber } from "./makeInputCell";

describe("makeInputCell", () => {
  it("trimNumber", () => {
    expect(trimNumber("123.456", 2)).toEqual("123.45");
    expect(trimNumber("123", 2)).toEqual("123");
  });
});
