import {
  AuthPasswordFormSchema,
  criteriaUnmatchExistingPassword,
  validateAuthPasswordFormValues,
} from "./AuthPasswordFormModel";

test("validate satisfying requirement", () => {
  const { failedHintMessages, errors } = validateAuthPasswordFormValues(
    AuthPasswordFormSchema,
    {
      newPassword: "Ab12345678####",
      confirmPassword: "Ab12345678####",
    }
  );

  expect(failedHintMessages).toHaveLength(0);
  expect(Object.keys(errors)).toHaveLength(0);
});

test("validate if unmatch", () => {
  const { errors } = validateAuthPasswordFormValues(AuthPasswordFormSchema, {
    newPassword: "Ab12345678####",
    confirmPassword: "def",
  });

  expect(errors.confirmPassword).toEqual("unmatch");
});

test("validate if unmatch existing password", () => {
  const p = "Ab12345678####";
  const { errors } = validateAuthPasswordFormValues(AuthPasswordFormSchema, {
    password: p,
    newPassword: "Ab12345678####",
    confirmPassword: "Ab12345678####",
  });

  expect(errors.newPassword).toEqual("unmatchExistingPassword");
});

test("ignore a password criteria", () => {
  const p = "Ab12345678####";
  const { failedHintMessages, errors } = validateAuthPasswordFormValues(
    AuthPasswordFormSchema,
    {
      password: p,
      newPassword: "Ab12345678####",
      confirmPassword: "Ab12345678####",
    },
    [criteriaUnmatchExistingPassword]
  );

  expect(failedHintMessages).toHaveLength(0);
  expect(Object.keys(errors)).toHaveLength(0);
});
