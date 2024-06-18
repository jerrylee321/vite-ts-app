import isKeyValueObject from "./isKeyValueObject";

describe("isKeyValueObject", () => {
  test("null is not a key value object", () => {
    expect(isKeyValueObject(null)).toEqual(false);
  });

  test("undefined is not a key value object", () => {
    expect(isKeyValueObject(undefined)).toEqual(false);
  });

  test("array is not a key value object", () => {
    expect(isKeyValueObject([1, 2, 3])).toEqual(false);
  });

  test("object is a key value object", () => {
    expect(isKeyValueObject({ a: 1, b: null })).toEqual(true);
  });
});
