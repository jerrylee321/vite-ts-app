import "./atLeastOneRequired";
import * as yup from "yup";

describe("atLeastOneRequired", () => {
  const schema = yup.object({
    field1: yup.string(),
    field2: yup.string(),
    field3: yup.string(),
  });

  it("should throw if all of specified fields are falsy", () => {
    const someSchema = schema.atLeastOneRequired(["field1", "field2"]);
    expect(() => someSchema.validateSync({ field3: "hello" })).toThrow();
  });

  it("should throw except all of specified fields are falsy", () => {
    const someSchema = schema.atLeastOneRequired(["field3"], { except: true });
    expect(() => someSchema.validateSync({ field3: "hello" })).toThrow();
  });

  it("should validate if some of specified fields are truthy", () => {
    const someSchema = schema.atLeastOneRequired(["field1", "field2"]);
    expect(someSchema.validateSync({ field1: "hello" })).toMatchObject({
      field1: "hello",
    });
  });

  it("should validate except some of specified fields are truthy", () => {
    const someSchema = schema.atLeastOneRequired(["field3"], { except: true });
    expect(someSchema.validateSync({ field1: "hello" })).toMatchObject({
      field1: "hello",
    });
  });

  it("should throw if all fields are falsy", () => {
    const someSchema = schema.atLeastOneRequired();
    expect(() => someSchema.validateSync({})).toThrow();
  });

  it("should validate if some fields are truthy", () => {
    const someSchema = schema.atLeastOneRequired();
    expect(someSchema.validateSync({ field1: "hello" })).toMatchObject({
      field1: "hello",
    });
  });

  it("should have specified fields array in description", () => {
    const someSchema = schema.atLeastOneRequired(["field1", "field2"]);
    const desc = someSchema.describe();
    expect(desc).toMatchObject({
      tests: expect.arrayContaining([
        expect.objectContaining({
          name: "atLeastOneRequired",
          params: expect.objectContaining({ fields: ["field1", "field2"] }),
        }),
      ]),
    });
  });
});
