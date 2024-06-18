import Keycloak, { KeycloakPromise, KeycloakTokenParsed } from "keycloak-js";

// NOTE: Rule disabled because Keycloak functions are not async and they
// return a non-standard Promise.
/* eslint-disable @typescript-eslint/promise-function-async */

const asKeycloakPromise = <T, U>(
  promise: Promise<T>
): KeycloakPromise<T, U> => {
  // KeycloakPromise is a Promise that also contains `success` and `error`
  // field. These fields will not be used by application code. Hence the promise
  // is forced to the required type.
  return promise as unknown as KeycloakPromise<T, U>;
};

const mockAuthenticated = jest.fn();
const mockToken = jest.fn();
const mockTokenParsed = jest.fn();
const mockIdTokenParsed = jest.fn();

interface MockAuthenticatedOptions {
  token?: string;
  tokenParsed?: KeycloakTokenParsed;
}

export interface KeycloakMockHelpers {
  mockAuthenticated: (options?: MockAuthenticatedOptions) => void;
  mockUnauthenticated: () => void;
}

export type MockedKeycloak = jest.MockedObject<Keycloak> & KeycloakMockHelpers;

const mock: MockedKeycloak = jest.fn().mockImplementation(() => {
  const keycloak = {
    init: jest.fn((_initOptions) => {
      return asKeycloakPromise(Promise.resolve(false));
    }),
    login: jest.fn((_options?) => {
      return asKeycloakPromise(Promise.resolve());
    }),
    logout: jest.fn((_options?) => {
      return asKeycloakPromise(Promise.resolve());
    }),
    register: jest.fn((_options?) => {
      return asKeycloakPromise(Promise.resolve());
    }),
    accountManagement: jest.fn(() => {
      return asKeycloakPromise(Promise.resolve());
    }),
    createLoginUrl: jest.fn((_options?) => {
      return "";
    }),
    createLogoutUrl: jest.fn((_options?) => {
      return "";
    }),
    createRegisterUrl: jest.fn((_options?) => {
      return "";
    }),
    createAccountUrl: jest.fn((_options?) => {
      return "";
    }),
    isTokenExpired: jest.fn((_minValidity?) => {
      return false;
    }),
    updateToken: jest.fn((_minValidity) => {
      return asKeycloakPromise(Promise.resolve(false));
    }),
    clearToken: jest.fn(() => {}),
    hasRealmRole: jest.fn((_role) => {
      return false;
    }),
    hasResourceRole: jest.fn((_role, _resource?) => {
      return false;
    }),
    loadUserProfile: jest.fn(() => {
      return asKeycloakPromise(Promise.resolve({}));
    }),
    loadUserInfo: jest.fn(() => {
      return asKeycloakPromise(Promise.resolve({}));
    }),
    mockAuthenticated: (options: KeycloakTokenParsed = {}) => {
      const {
        token = "some-token",
        tokenParsed = {
          sub: "24601",
          role: "User",
          name: "John Doe",
          preferred_username: "johndoe",
          email: "johndoe@example.com",
        },
        idTokenParsed = {
          sid: "id24601",
        },
      } = options;
      keycloak.init.mockImplementation((_initOptions) => {
        return asKeycloakPromise(Promise.resolve(true));
      });
      mockAuthenticated.mockReturnValue(true);
      mockToken.mockReturnValue(token);
      mockTokenParsed.mockReturnValue(tokenParsed);
      mockIdTokenParsed.mockReturnValue(idTokenParsed);
    },
    mockUnauthenticated: () => {
      keycloak.init.mockImplementation((_initOptions) => {
        return asKeycloakPromise(Promise.resolve(false));
      });
      mockAuthenticated.mockReturnValue(false);
      mockToken.mockReturnValue(undefined);
      mockTokenParsed.mockReturnValue(undefined);
      mockIdTokenParsed.mockReturnValue(undefined);
    },
  };
  Object.defineProperties(keycloak, {
    authenticated: {
      get: mockAuthenticated,
    },
    token: {
      get: mockToken,
    },
    tokenParsed: {
      get: mockTokenParsed,
    },
    idTokenParsed: {
      get: mockIdTokenParsed,
    },
  });
  return keycloak;

  // Force cast to MockedKeycloak because jest type is missing `withImplementation`
  // property on `Mock`, but it is available and expected by `MockedObject`.
}) as unknown as MockedKeycloak;

export default mock;
