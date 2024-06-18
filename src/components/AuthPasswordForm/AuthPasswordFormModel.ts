import { FormikErrors } from "formik";
import { InferType, object, ref, string, TestFunction } from "yup";

import { AuthPasswordRequirementHintMessage } from "../../models/CommonAuthentication";
import { validateFormMultipleErrors } from "../../utils/formValidation";

export type { AuthPasswordRequirementHintMessage };

export const criteriaRequired = "required";
export const criteriaLength = "length";
export const criteriaUppercase = "uppercase";
export const criteriaLowercase = "lowercase";
export const criteriaDigit = "digit";
export const criteriaSpecial = "special";
export const criteriaUnmatch = "unmatch";
export const criteriaUsername = "username";
export const criteriaStrength = "strength";
export const criteriaUnmatchExistingPassword = "unmatchExistingPassword";

const notMatchExistingPasswordTestFunction: TestFunction<string> = (
  value,
  context
) => {
  const existingPassword = context.parent.password as string | undefined;
  return (
    !existingPassword || existingPassword === "" || existingPassword !== value
  );
};

export const AuthPasswordFormSchema = object({
  password: string().documentation({ hidden: true }),
  email: string().optional().documentation({ hidden: true }),
  // NOTE: Do not use password validation schema here, should use
  // usePasswordValidator instead. The validator will also handle
  // checking on the remote server, which we assume is authoritative
  // in password requirements.
  newPassword: string()
    .required()
    .test(
      "notMatchExistingPassword",
      criteriaUnmatchExistingPassword,
      notMatchExistingPasswordTestFunction
    )
    .i18nLabel("AuthChangePasswordDialog.newPassword.label"),

  confirmPassword: string()
    .required(criteriaRequired)
    .oneOf([ref("newPassword"), ""], criteriaUnmatch)
    .documentation({
      validations: {
        oneOf: "equals: newPassword",
      },
    })
    .i18nLabel("AuthChangePasswordDialog.confirmPassword.label"),
});

export const ORSOAuthPasswordFormSchema = AuthPasswordFormSchema;

export type AuthPasswordFormModel = InferType<typeof AuthPasswordFormSchema>;

export const AuthPasswordFormInitialValue: Readonly<AuthPasswordFormModel> =
  Object.freeze({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

export const validateAuthPasswordFormValues = (
  schema: typeof AuthPasswordFormSchema,
  values: AuthPasswordFormModel,
  ignoreMessages: AuthPasswordRequirementHintMessage[] = []
): {
  errors: FormikErrors<AuthPasswordFormModel>;
  failedHintMessages: AuthPasswordRequirementHintMessage[];
} => {
  const { errors, messages } = validateFormMultipleErrors(schema, values);
  const failedHintMessages = (messages["newPassword"] ??
    []) as AuthPasswordRequirementHintMessage[];

  return {
    errors: Object.fromEntries(
      Object.entries(errors).filter(
        ([_key, value]) =>
          !ignoreMessages.includes(value as AuthPasswordRequirementHintMessage)
      )
    ),
    failedHintMessages: failedHintMessages.filter(
      (value) => !ignoreMessages.includes(value)
    ),
  };
};
