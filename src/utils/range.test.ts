import range from "./range";

describe("Range", () => {
  it("should generate number array with correct steps and range", () => {
    expect(range(15, 20, 1)).toEqual([15, 16, 17, 18, 19, 20]);
    expect(range(15, 20, 2)).toEqual([15, 17, 19]);
  });
});
