import { IIdleTimer } from "react-idle-timer";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { JWTPayload, UnsecuredJWT } from "jose";

import { reducer } from "../redux";

import useAuthTokenKeepalive, {
  shouldUpdateToken,
  tryParseTokens,
} from "./useAuthTokenKeepalive";

describe("shouldUpdateToken", () => {
  test("should update if min is -1", () => {
    expect(
      shouldUpdateToken({} as JWTPayload, {} as JWTPayload, -1)
    ).toBeTruthy();
  });

  test("should not update if exp is undefined", () => {
    expect(
      shouldUpdateToken(
        { exp: undefined } as JWTPayload,
        { exp: undefined } as JWTPayload,
        600
      )
    ).toBeFalsy();
  });

  test("should not update if exp is not in near future ", () => {
    const exp = new Date().getTime() / 1000 + 1200;
    expect(
      shouldUpdateToken({ exp } as JWTPayload, { exp } as JWTPayload, 600)
    ).toBeFalsy();
  });

  test("should update if exp is in near future ", () => {
    const exp = new Date().getTime() / 1000 + 300;
    expect(
      shouldUpdateToken({ exp } as JWTPayload, { exp } as JWTPayload, 600)
    ).toBeTruthy();
  });
});

describe("tryParseTokens", () => {
  test("should return null for null tokens", () => {
    expect(tryParseTokens(null, null)).toMatchObject({
      accessToken: null,
      accessTokenParsed: null,
      refreshToken: null,
      refreshTokenParsed: null,
    });
  });

  test("should return null for invalid tokens", () => {
    expect(tryParseTokens("access-token", "refresh-token")).toMatchObject({
      accessToken: "access-token",
      accessTokenParsed: null,
      refreshToken: "refresh-token",
      refreshTokenParsed: null,
    });
  });
});

const makeStore = (accessToken: string, refreshToken: string) => {
  return configureStore({
    reducer,
    preloadedState: {
      auth: {
        isAuthenticated: true,
        accessToken,
        idToken: null,
        refreshToken,
        currentUser: {
          name: "John Doe",
          email: "johndoe@example.com",
          username: "johndoe@example.com",
          role: "User",
          userID: "08c27caa-335a-44df-bdea-2d8f44024601",
        },
        lastError: null,
        lastSessionId: "SID",
        redirectPath: null,
        isLoggingOut: false,
      },
    },
  });
};

describe("useAuthTokenKeepalive.getAccessToken", () => {
  test("should get existing token", async () => {
    const token = new UnsecuredJWT({}).setExpirationTime("10m").encode();
    const newToken = new UnsecuredJWT({}).setExpirationTime("10m").encode();
    const store = makeStore(token, token);
    const { result } = renderHook(
      () =>
        useAuthTokenKeepalive({
          portal: "mpfa",
          minValiditySeconds: 60,
          onRefresh: async () => {
            return {
              accessToken: newToken,
              refreshToken: newToken,
              idToken: "id-token",
            };
          },
          idleTimer: {
            isLeader() {
              return true;
            },
          } as IIdleTimer,
        }),
      {
        wrapper: ({ children }) => {
          return <ReduxProvider store={store}>{children}</ReduxProvider>;
        },
      }
    );
    const { getAccessToken } = result.current;
    expect(await getAccessToken()).toEqual(token);
  });

  test("should refresh expired token", async () => {
    const token = new UnsecuredJWT({}).setExpirationTime("1m").encode();
    const newToken = new UnsecuredJWT({}).setExpirationTime("1m").encode();
    const store = makeStore(token, token);
    const { result } = renderHook(
      () =>
        useAuthTokenKeepalive({
          portal: "mpfa",
          minValiditySeconds: 600,
          onRefresh: async (oldRefreshToken) => {
            expect(oldRefreshToken).toEqual(token);
            return {
              accessToken: newToken,
              refreshToken: newToken,
              idToken: "id-token",
            };
          },
          idleTimer: {
            isLeader() {
              return true;
            },
          } as IIdleTimer,
        }),
      {
        wrapper: ({ children }) => {
          return <ReduxProvider store={store}>{children}</ReduxProvider>;
        },
      }
    );
    const { getAccessToken } = result.current;
    expect(await getAccessToken()).toEqual(newToken);
  });

  test("should null if not authenticated", async () => {
    const store = configureStore({ reducer });
    const { result } = renderHook(
      () =>
        useAuthTokenKeepalive({
          portal: "mpfa",
          minValiditySeconds: 60,
          onRefresh: async () => {
            throw new Error("should not be called");
          },
          idleTimer: {
            isLeader() {
              return true;
            },
          } as IIdleTimer,
        }),
      {
        wrapper: ({ children }) => {
          return <ReduxProvider store={store}>{children}</ReduxProvider>;
        },
      }
    );
    const { getAccessToken } = result.current;
    expect(await getAccessToken()).toBeNull();
  });
});

describe("useAuthTokenKeepalive.updateTokenIfNeeded", () => {
  test("should return false if not expired", async () => {
    const token = new UnsecuredJWT({}).setExpirationTime("10m").encode();
    const newToken = new UnsecuredJWT({}).setExpirationTime("10m").encode();
    const store = makeStore(token, token);
    const { result } = renderHook(
      () =>
        useAuthTokenKeepalive({
          portal: "mpfa",
          minValiditySeconds: 60,
          onRefresh: async () => {
            return {
              accessToken: newToken,
              refreshToken: newToken,
              idToken: "id-token",
            };
          },
          idleTimer: {
            isLeader() {
              return true;
            },
          } as IIdleTimer,
        }),
      {
        wrapper: ({ children }) => {
          return <ReduxProvider store={store}>{children}</ReduxProvider>;
        },
      }
    );
    const { updateTokenIfNeeded } = result.current;
    expect(await updateTokenIfNeeded()).toBeFalsy();
  });

  test("should refresh expired token", async () => {
    const token = new UnsecuredJWT({}).setExpirationTime("1m").encode();
    const newToken = new UnsecuredJWT({}).setExpirationTime("1m").encode();
    const store = makeStore(token, token);
    const { result } = renderHook(
      () =>
        useAuthTokenKeepalive({
          portal: "mpfa",
          minValiditySeconds: 600,
          onRefresh: async (oldRefreshToken) => {
            expect(oldRefreshToken).toEqual(token);
            return {
              accessToken: newToken,
              refreshToken: newToken,
              idToken: "id-token",
            };
          },
          idleTimer: {
            isLeader() {
              return true;
            },
          } as IIdleTimer,
        }),
      {
        wrapper: ({ children }) => {
          return <ReduxProvider store={store}>{children}</ReduxProvider>;
        },
      }
    );
    const { updateTokenIfNeeded } = result.current;
    expect(await updateTokenIfNeeded()).toBeTruthy();
  });

  test("should return false if not authenticated", async () => {
    const store = configureStore({ reducer });
    const { result } = renderHook(
      () =>
        useAuthTokenKeepalive({
          portal: "mpfa",
          minValiditySeconds: 60,
          onRefresh: async () => {
            throw new Error("should not be called");
          },
          idleTimer: {
            isLeader() {
              return true;
            },
          } as IIdleTimer,
        }),
      {
        wrapper: ({ children }) => {
          return <ReduxProvider store={store}>{children}</ReduxProvider>;
        },
      }
    );
    const { updateTokenIfNeeded } = result.current;
    expect(await updateTokenIfNeeded()).toBeFalsy();
  });
});
