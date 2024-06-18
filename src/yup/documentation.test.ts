import "./documentation";
import * as yup from "yup";

describe("documentation", () => {
  it("should add meta to the schema", () => {
    const schema = yup.object({
      field1: yup.string().documentation({ hidden: true }),
    });

    const desc = schema.describe();
    expect(desc).toMatchObject({
      fields: expect.objectContaining({
        field1: expect.objectContaining({
          meta: expect.objectContaining({
            documentation: { hidden: true },
          }),
        }),
      }),
    });
  });

  it("should return meta", () => {
    const schema = yup.object({
      field1: yup.string().meta({ documentation: { hidden: true } }),
    });

    const documentation = (
      schema.fields["field1"] as yup.Schema
    ).documentation();
    expect(documentation).toMatchObject({
      hidden: true,
    });
  });
});
