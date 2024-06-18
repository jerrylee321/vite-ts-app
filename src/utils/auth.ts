import { differenceInSeconds } from "date-fns";
import { decodeJwt, JWTPayload } from "jose";
import { KeycloakTokenParsed } from "keycloak-js";

import { User } from "../models/user";

export const keycloakTokenToUser = (token: KeycloakTokenParsed): User => {
  const {
    email,
    preferred_username: username,
    name,
    sub: userID,
    role,
  } = token;
  if (!userID) {
    throw Error("keycloak token is missing subject (sub)");
  }
  return { email, username, name, userID, role };
};

export const toStringOrEmpty = (value: unknown): string => {
  if (typeof value === "string") return value;
  return "";
};

export const parsedJwtToken = (token: string): JWTPayload => {
  return decodeJwt(token);
};

export const tryParseJwtToken = (token: string): JWTPayload | null => {
  try {
    return decodeJwt(token);
  } catch {
    return null;
  }
};

export const jwtTokenToUser = (token: JWTPayload): User => {
  const { sub: userID, preferred_username: username, name, role } = token;
  if (!userID) {
    throw Error("jwt token is missing subject (sub)");
  }
  return {
    userID,
    username: toStringOrEmpty(username),
    email: toStringOrEmpty(username),
    name: toStringOrEmpty(name),
    role: toStringOrEmpty(role),
  };
};

export const isTokenExpired = (
  token: JWTPayload,
  minValiditySeconds: number = 0
): boolean | null => {
  if (token.exp == null) {
    return null;
  }

  return (
    differenceInSeconds(new Date(token.exp * 1000), Date.now()) <
    minValiditySeconds
  );
};
