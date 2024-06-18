import "./i18nLabel";
import * as yup from "yup";

describe("i18nLabel", () => {
  it("should add label to the schema", () => {
    const schema = yup
      .object({
        field1: yup.string().i18nLabel("AuthLayout.appTitle"),
      })
      .i18nLabel("AuthLayout.backToLogin");

    const desc = schema.describe();
    expect(desc).toMatchObject({
      fields: expect.objectContaining({
        field1: expect.objectContaining({ label: "AuthLayout.appTitle" }),
      }),
      label: "AuthLayout.backToLogin",
    });
  });
});
