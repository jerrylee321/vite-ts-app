import select from "./select";

describe("select", () => {
  const options = { a: 1, b: 2 };
  test("should select", () => {
    expect(select(options, "a", 3)).toEqual(1);
    expect(select(options, "b", 3)).toEqual(2);
  });
  test("should fallback when key does not exists", () => {
    expect(select(options, "c", 3)).toEqual(3);
  });
});
