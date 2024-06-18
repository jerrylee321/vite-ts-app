import {
  AuthPasswordValidatorSchema,
  initialResult,
  mapMessagesToResult,
  passwordContainsUsername,
  passwordIsValid,
  passwordIsValidIgnoreStrength,
  passwordIsValidResult,
} from "./CommonAuthentication";

describe("passwordContainsUsername", () => {
  test("true if name in email", () => {
    expect(passwordContainsUsername("abc", "abc@example.com")).toBeTruthy();
  });

  test("true if name in username", () => {
    expect(passwordContainsUsername("abc", "abc")).toBeTruthy();
  });

  test("true if not contained", () => {
    expect(passwordContainsUsername("abc", "def")).toBeFalsy();
  });
});

describe("AuthPasswordValidatorSchema", () => {
  const value = "123456$Abc";
  test("error if contains username", () => {
    expect(() =>
      AuthPasswordValidatorSchema.validateSync({
        username: "123456@example.com",
        password: value,
      })
    ).toThrow();
  });

  test("no error if username not supplied", () => {
    expect(() =>
      AuthPasswordValidatorSchema.validateSync({
        password: value,
      })
    ).not.toThrow();
  });
});

describe("mapMessagesToResult", () => {
  test("without username", () => {
    expect(mapMessagesToResult(["length"])).toMatchObject({
      length: false,
      uppercase: true,
      lowercase: true,
      numeric: true,
      specialCharacters: true,
    });
  });

  test("with username and username not an error", () => {
    expect(
      mapMessagesToResult(["length"], { includeUsername: true })
    ).toMatchObject({
      username: true,
      length: false,
      uppercase: true,
      lowercase: true,
      numeric: true,
      specialCharacters: true,
    });
  });

  test("with username and username is an error", () => {
    expect(
      mapMessagesToResult(["length", "username"], { includeUsername: true })
    ).toMatchObject({
      username: false,
      length: false,
      uppercase: true,
      lowercase: true,
      numeric: true,
      specialCharacters: true,
    });
  });
});

describe("passwordIsValid", () => {
  test("valid", () => {
    expect(passwordIsValid(passwordIsValidResult)).toBeTruthy();
  });

  test("invalid", () => {
    expect(passwordIsValid(initialResult)).toBeFalsy();
  });

  test("valid ignoring username", () => {
    expect(
      passwordIsValid({ ...passwordIsValidResult, username: false }, [
        "username",
      ])
    ).toBeTruthy();
  });
});

describe("passwordIsValidIgnoreStrength", () => {
  test("valid", () => {
    expect(
      passwordIsValidIgnoreStrength({
        ...passwordIsValidResult,
        strength: false,
      })
    ).toBeTruthy();
  });
});
