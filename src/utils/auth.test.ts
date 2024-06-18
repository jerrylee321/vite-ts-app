import { testUser } from "./test/auth";
import {
  isTokenExpired,
  jwtTokenToUser,
  keycloakTokenToUser,
  parsedJwtToken,
  toStringOrEmpty,
} from "./auth";

const jwtToken = {
  exp: 1683645117,
  iat: 1683644217,
  jti: "c283bca4-f827-4a9d-a75e-0d67943b651f",
  iss: "https://example.com/auth/realms/external-orso",
  aud: "account",
  sub: "0a8ce556-4b8d-44ab-8e6b-83ab0a3fc777",
  typ: "Bearer",
  azp: "empf-auth-orso-client",
  session_state: "0e95beb5-5c91-4dd3-9868-4863c85864ff",
  acr: "1",
  realm_access: {
    roles: [
      "offline_access",
      "default-roles-external-orso",
      "uma_authorization",
    ],
  },
  resource_access: {
    account: {
      roles: ["manage-account", "manage-account-links", "view-profile"],
    },
  },
  scope: "empf-uuid-as-subject profile email",
  sid: "e34d6660-5ce4-4d07-847d-5b92a9c0cf2e",
  role: "ROLE_ORSO",
  email_verified: false,
  name: "example@pccw.com example@pccw.com",
  preferred_username: "example@pccw.com",
  given_name: "example@pccw.com",
  family_name: "example@pccw.com",
  status: "A",
};

describe("keycloakTokenToUser", () => {
  test("should parse token", () => {
    const token = {
      sub: "24601",
      role: "User",
      name: "John Doe",
      preferred_username: "johndoe",
      email: "johndoe@example.com",
    };

    expect(keycloakTokenToUser(token)).toMatchObject(testUser);
  });

  test("should throw error if token is invalid", () => {
    const token = {};

    expect(() => {
      keycloakTokenToUser(token);
    }).toThrow();
  });
});

test("toStringOrEmpty", () => {
  expect(toStringOrEmpty("abc")).toEqual("abc");
  expect(toStringOrEmpty(123)).toEqual("");
});

test("parsedJwtToken", () => {
  expect(
    parsedJwtToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhmdGRjOWduZ1l4ZGdscEVZazM4UE1NSWwxejZ6dXAzUUgwcnZmeGt4QkEifQ.eyJleHAiOjE2ODM2NDUxMTcsImlhdCI6MTY4MzY0NDIxNywianRpIjoiYzI4M2JjYTQtZjgyNy00YTlkLWE3NWUtMGQ2Nzk0M2I2NTFmIiwiaXNzIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9hdXRoL3JlYWxtcy9leHRlcm5hbC1vcnNvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjBhOGNlNTU2LTRiOGQtNDRhYi04ZTZiLTgzYWIwYTNmYzc3NyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGYtYXV0aC1vcnNvLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIwZTk1YmViNS01YzkxLTRkZDMtOTg2OC00ODYzYzg1ODY0ZmYiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1leHRlcm5hbC1vcnNvIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtcGYtdXVpZC1hcy1zdWJqZWN0IHByb2ZpbGUgZW1haWwiLCJzaWQiOiJlMzRkNjY2MC01Y2U0LTRkMDctODQ3ZC01YjkyYTljMGNmMmUiLCJyb2xlIjoiUk9MRV9PUlNPIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiZXhhbXBsZUBwY2N3LmNvbSBleGFtcGxlQHBjY3cuY29tIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZXhhbXBsZUBwY2N3LmNvbSIsImdpdmVuX25hbWUiOiJleGFtcGxlQHBjY3cuY29tIiwiZmFtaWx5X25hbWUiOiJleGFtcGxlQHBjY3cuY29tIiwic3RhdHVzIjoiQSJ9.ocdJMk9cjlGWKIP6bBvRGdaGi0-GL9AQ1mfzXpdoiDU"
    )
  ).toMatchObject(jwtToken);
});

describe("jwtTokenToUser", () => {
  test("have user id", () => {
    expect(jwtTokenToUser(jwtToken)).toMatchObject({
      userID: "0a8ce556-4b8d-44ab-8e6b-83ab0a3fc777",
      email: "example@pccw.com",
      username: "example@pccw.com",
      name: "example@pccw.com example@pccw.com",
      role: "ROLE_ORSO",
    });
  });

  test("have no id", () => {
    expect(() => {
      jwtTokenToUser({ ...jwtToken, sub: undefined });
    }).toThrowError();
  });
});

describe("isTokenExpired", () => {
  test("past, no window", () => {
    expect(
      isTokenExpired({
        exp: 0,
      })
    ).toEqual(true);
  });
  test("future, no window", () => {
    expect(
      isTokenExpired({
        exp: Date.now() / 1000 + 10,
      })
    ).toEqual(false);
  });
  test("past, has window", () => {
    expect(
      isTokenExpired(
        {
          exp: Date.now() / 1000,
        },
        10
      )
    ).toEqual(true);
  });
  test("future, has window", () => {
    expect(
      isTokenExpired(
        {
          exp: Date.now() / 1000 + 20,
        },
        10
      )
    ).toEqual(false);
  });
  test("null", () => {
    expect(isTokenExpired({})).toEqual(null);
  });
});
