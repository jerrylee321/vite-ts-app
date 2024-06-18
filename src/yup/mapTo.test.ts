import "./mapTo";
import * as yup from "yup";

describe("mapTo", () => {
  it("should add meta to the schema", () => {
    const schema = yup.object({
      field1: yup.string().mapTo({ name: "field2" }),
    });

    const desc = schema.describe();
    expect(desc).toMatchObject({
      fields: expect.objectContaining({
        field1: expect.objectContaining({
          meta: expect.objectContaining({ mapTo: { name: "field2" } }),
        }),
      }),
    });
  });

  it("should add meta to the schema for tuple", () => {
    const schema = yup.object({
      field1: yup.array(yup.string()).mapTo({ tupleNames: ["from", "to"] }),
    });

    const desc = schema.describe();
    expect(desc).toMatchObject({
      fields: expect.objectContaining({
        field1: expect.objectContaining({
          meta: expect.objectContaining({
            mapTo: { tupleNames: ["from", "to"] },
          }),
        }),
      }),
    });
  });
});
