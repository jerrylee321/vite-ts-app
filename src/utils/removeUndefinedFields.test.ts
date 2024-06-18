import removeUndefinedFields from "./removeUndefinedFields";

describe("removeUndefinedFields", () => {
  test("should remove undefined fields", () => {
    expect(
      removeUndefinedFields({
        a: 1,
        b: undefined,
        c: null,
        d: { a: 1, b: undefined, c: null },
      })
    ).toEqual({
      a: 1,
      c: null,
      d: { a: 1, c: null },
    });
  });
});
