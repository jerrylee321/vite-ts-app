import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import { waitFor } from "@testing-library/react";

import { User } from "../models/user";
import defaultStore, { reducer } from "../redux";
import authReducer, { initialize } from "../redux/auth";
import { testUser } from "../utils/test/auth";
import mockedKeycloak from "../utils/test/keycloak";
import { renderHookWithProviders } from "../utils/test/render";

import { useAuth, UseAuthValues, useCurrentUser } from "./AuthProvider";

const renderUseAuthHook = (store: typeof defaultStore): UseAuthValues => {
  const { result } = renderHookWithProviders(() => useAuth(), {
    store,
  });
  return result.current;
};

const renderUseCurrentUserHook = (store: typeof defaultStore): User | null => {
  const { result } = renderHookWithProviders(() => useCurrentUser(), {
    store,
  });
  return result.current;
};

describe("use auth", () => {
  test("should return authenticated state", () => {
    mockedKeycloak.mockUnauthenticated();
    const store = configureStore({
      reducer,
      preloadedState: {
        auth: authReducer(
          undefined,
          initialize({
            isAuthenticated: true,
            accessToken: "some-token",
            idToken: "some-id-token",
            refreshToken: "some-refresh-token",
            user: testUser,
          })
        ),
      },
    });
    const { isAuthenticated, accessToken, refreshToken, idToken, currentUser } =
      renderUseAuthHook(store);
    expect(isAuthenticated).toEqual(true);
    expect(accessToken).toEqual("some-token");
    expect(refreshToken).toEqual("some-refresh-token");
    expect(idToken).toEqual("some-id-token");
    expect(currentUser).toMatchObject(testUser);
  });

  describe("authenticate", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should call keycloak.init", async () => {
      const store = configureStore({ reducer });

      const { authenticate } = renderUseAuthHook(store);
      await act(async () => {
        // Call twice to test race condition
        await Promise.all([authenticate(), authenticate()]);
      });
      expect(mockedKeycloak.init).toBeCalledWith(
        expect.objectContaining({
          onLoad: "login-required",
        })
      );

      // Prevent effects to cause init called more than once.
      expect(mockedKeycloak.init).toBeCalledTimes(1);
    });

    test("should init to authenticated state", async () => {
      const store = configureStore({ reducer });

      mockedKeycloak.mockAuthenticated({ token: "some-token" });
      const { authenticate } = renderUseAuthHook(store);
      await act(async () => {
        await authenticate();
      });
      const { isAuthenticated, accessToken } = store.getState().auth;
      expect(isAuthenticated).toEqual(true);
      expect(accessToken).toEqual("some-token");
    });

    test("should init to unauthentication state", async () => {
      const store = configureStore({ reducer });

      mockedKeycloak.mockUnauthenticated();
      const { authenticate } = renderUseAuthHook(store);
      await act(async () => {
        await authenticate();
      });
      expect(mockedKeycloak.init).toBeCalledTimes(1);
      const { isAuthenticated, accessToken } = store.getState().auth;
      expect(isAuthenticated).toEqual(false);
      expect(accessToken).toBeNull();
    });

    test("should catch error", async () => {
      const store = configureStore({ reducer });

      const mockConsole = jest.fn();
      jest.spyOn(console, "error").mockImplementation(mockConsole);
      mockedKeycloak.init.mockImplementation(() => {
        throw new Error();
      });
      const { authenticate } = renderUseAuthHook(store);
      await act(async () => {
        await authenticate();
      });
      expect(mockedKeycloak.init).toBeCalled();
      expect(mockConsole).toBeCalled();
    });
  });

  describe("logout", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should call keycloak.init when keycloak is not initialized", async () => {
      const store = configureStore({ reducer });

      const { logout } = renderUseAuthHook(store);
      await act(async () => {
        await logout();
      });
      expect(mockedKeycloak.init).toBeCalledTimes(1);
      expect(mockedKeycloak.logout).toBeCalledTimes(0);
    });

    test("should call keycloak.logout when keycloak is initialized", async () => {
      mockedKeycloak.mockUnauthenticated();
      const store = configureStore({
        reducer,
        preloadedState: {
          auth: authReducer(
            undefined,
            initialize({
              isAuthenticated: true,
              accessToken: "some-token",
              idToken: "some-id-token",
              refreshToken: "some-refresh-token",
              user: testUser,
            })
          ),
        },
      });

      const { result } = renderHookWithProviders(() => useAuth(), {
        store,
      });

      // wait for auth provider init
      await waitFor(() => {
        expect(mockedKeycloak.init).toBeCalled();
      });

      const { logout } = result.current;
      await act(async () => {
        await logout();
      });
      expect(mockedKeycloak.logout).toBeCalledTimes(1);
    });
  });
});

describe("use current user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return current user if authenticated", () => {
    mockedKeycloak.mockUnauthenticated();
    const store = configureStore({
      reducer,
      preloadedState: {
        auth: authReducer(
          undefined,
          initialize({
            isAuthenticated: true,
            accessToken: "some-access-token",
            idToken: "some-id-token",
            refreshToken: "some-refresh-token",
            user: testUser,
          })
        ),
      },
    });
    const user = renderUseCurrentUserHook(store);
    expect(user).toMatchObject(testUser);
  });

  test("should throw error if not authenticated", () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        auth: authReducer(undefined, initialize({ isAuthenticated: false })),
      },
    });
    expect(() => {
      renderUseCurrentUserHook(store);
    }).toThrow();
  });
});
