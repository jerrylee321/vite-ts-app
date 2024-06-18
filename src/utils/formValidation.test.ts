import { object, string } from "yup";

import { validateFormMultipleErrors } from "./formValidation";

test("validateFormMultipleErrors", () => {
  const schema = object({
    a: string(),
    b: string().matches(/[A-Z]/, "uppercase").matches(/[a-z]/, "lowercase"),
    c: string().matches(/[A-Z]/, "uppercase").matches(/[a-z]/, "lowercase"),
  });

  expect(
    validateFormMultipleErrors(schema, { a: "1", b: "1", c: "A" })
  ).toMatchObject({
    errors: {
      b: "uppercase",
      c: "lowercase",
    },
    messages: {
      b: ["uppercase", "lowercase"],
      c: ["lowercase"],
    },
  });
});
