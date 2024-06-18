import * as yup from "yup";

import { ValidatePasswordResult } from "../apis/CommonAuthenticationAPI";

export type AuthPasswordRequirementHintMessage =
  | "length"
  | "uppercase"
  | "lowercase"
  | "digit"
  | "username"
  | "special"
  | "unmatch"
  | "unmatchExistingPassword";

export const AuthPasswordSchema = yup
  .string()
  .required("required")
  .min(10, "length")
  .max(14, "length")
  .matches(/[A-Z]/, "uppercase")
  .matches(/[a-z]/, "lowercase")
  .matches(/[0-9]/, "digit")
  .matches(/[ !"#$%&'()*+,-./]/, "special");

export const passwordContainsUsername = (
  password: string,
  username: string
): boolean => {
  const part = username.split("@")[0]; // remove @example.com if it is an email address
  return part !== "" && password.includes(part);
};

const notMatchUsernameTestFunction: yup.TestFunction<string> = (
  value,
  context
) => {
  const username = context.parent.username as string | undefined;
  if (username) {
    return !passwordContainsUsername(value, username);
  }
  return true;
};

export const AuthPasswordValidatorSchema = yup.object({
  username: yup.string().optional(),
  password: AuthPasswordSchema.test(
    "notMatchUsername",
    "username",
    notMatchUsernameTestFunction
  ),
});

export const mapMessagesToResult = (
  messages: AuthPasswordRequirementHintMessage[],
  options: { includeUsername?: boolean } = {}
): Partial<ValidatePasswordResult> => {
  const { includeUsername = false } = options;
  return {
    ...(includeUsername
      ? {
          username: !messages.includes("username"),
        }
      : undefined),
    length: !messages.includes("length"),
    uppercase: !messages.includes("uppercase"),
    lowercase: !messages.includes("lowercase"),
    numeric: !messages.includes("digit"),
    specialCharacters: !messages.includes("special"),
  };
};

export const initialResult: ValidatePasswordResult = Object.freeze({
  strength: false,
  length: false,
  username: false,
  uppercase: false,
  lowercase: false,
  numeric: false,
  specialCharacters: false,
});

export const passwordIsValidResult: ValidatePasswordResult = Object.freeze({
  strength: true,
  length: true,
  username: true,
  uppercase: true,
  lowercase: true,
  numeric: true,
  specialCharacters: true,
});

export const passwordIsValid = (
  result: ValidatePasswordResult,
  ignores: (keyof ValidatePasswordResult)[] = []
): boolean => {
  return !Object.entries(result)
    .filter(
      ([key, _]) => !ignores.includes(key as keyof ValidatePasswordResult)
    )
    .some(([_, value]) => !value);
};

export const passwordIsValidIgnoreStrength = (
  result: ValidatePasswordResult
): boolean => passwordIsValid(result, ["strength"]);

export type { ValidatePasswordResult };
