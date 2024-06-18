import areAllFieldsEmpty from "./areAllFieldsEmpty";

describe("areAllFieldsEmpty", () => {
  test("Should returnn correct value", () => {
    expect(
      areAllFieldsEmpty(
        {
          test1: "",
          test2: ["", ""],
          test3: "",
        },
        { fields: ["test1", "test2", "test3"] }
      )
    ).toEqual(true);
    expect(
      areAllFieldsEmpty(
        {
          test1: "value",
          test2: ["", ""],
          test3: "",
        },
        { excludingFields: ["test1"] }
      )
    ).toEqual(true);
  });
});
