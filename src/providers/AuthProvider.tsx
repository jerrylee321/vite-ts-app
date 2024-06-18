import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import APIClient from "../apis/APIClient";
import keycloak, { keycloakInitOptions } from "../apis/keycloak";
import Config from "../Config";
import useAuthTokenKeepalive from "../hooks/useAuthTokenKeepalive";
import useConfigureAuthClient from "../hooks/useConfigureAuthClient";
import { AuthError } from "../models/errors";
import { User } from "../models/user";
import { RootState } from "../redux";
import { loginAction } from "../redux/actions";
import {
  AuthState,
  error as errorAuth,
  initialize as initializeAuth,
  logout as logoutAuth,
} from "../redux/auth";
import AppRoutes from "../routes/AppRoutes";
import { PortalType } from "../types/Portal";
import { keycloakTokenToUser } from "../utils/auth";

import { useAppIdleTimer } from "./AppIdleTimerProvider";
import { AuthProviderQueries, defaultQueries } from "./AuthProviderQueries";

const authClient = new APIClient(axios.create());
export const AuthContext = React.createContext<AuthContextValues>(undefined!);

interface AuthenticateOptions {
  maintainLastSession?: boolean;
}

export interface AuthContextValues {
  authenticate: (options?: AuthenticateOptions) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: (forceRefresh?: boolean) => Promise<string | null>;
  portal: PortalType;
  authClient: APIClient;
  authQueries: AuthProviderQueries;
  isReady: boolean;
}

interface Props extends PropsWithChildren {
  portal: PortalType;
  basename: string;
}

// eslint-disable-next-line no-undef
const isTestMode = process.env.NODE_ENV === "test";

const AuthProvider = ({ portal, basename, children }: Props): ReactElement => {
  const dispatch = useDispatch();
  const isInitializing = useRef<boolean>(false);

  // NOTE: The auth state should be kept in sync using local storage
  // among all tabs.
  const authState = useSelector((state: RootState) => state.auth);
  const lastSessionIdRef = useRef<string | null>(authState.lastSessionId);
  const hasInitializedKeycloak = useRef(false);

  // NOTE: isReady should be false when the auth token is not checked
  // for the first time. For testing, we will not wait for token to get checked.
  const [isReady, _setIsReady] = useState(isTestMode);
  const setIsReady: typeof _setIsReady = useCallback((arg) => {
    if (isTestMode) {
      return;
    }
    _setIsReady(arg);
  }, []);

  const authClientRef = useRef(authClient);

  useConfigureAuthClient(authClientRef.current);

  const authStateRef = useRef<AuthState>(authState);
  useLayoutEffect(() => {
    authStateRef.current = authState;
  }, [authState]);

  const {
    idleTimerState,
    didLogoutInOtherTab,
    resetDidLogoutInOtherTab,
    idleTimer,
    setDisabled: setIdleTimerDisabled,
  } = useAppIdleTimer();
  const idleTimerRef = useRef(idleTimer);
  useLayoutEffect(() => {
    idleTimerRef.current = idleTimer;
  }, [idleTimer]);
  const { getAccessToken } = useAuthTokenKeepalive({
    minValiditySeconds: parseInt(Config.updateTokenMinValiditySeconds, 10),
    onRefresh: useCallback(
      /* istanbul ignore next */
      async (oldRefreshToken) => {
        // NOTE: We should use the refresh token from redux state because it
        // should be more recent than the one in keycloak, especially if this
        // tab just became a leader.
        //
        // If we do not do this, the non-leader tab will use an expired refresh
        // token that was set when the tab was just opened.
        keycloak.refreshToken = oldRefreshToken;

        // NOTE: keycloak will force refresh if minValiditySeconds == -1
        const didRefresh = await keycloak.updateToken(-1);
        if (didRefresh) {
          console.info("Keycloak token refreshed");
        } else {
          console.info("Keycloak token is still valid, no refresh needed");
        }

        const { token, refreshToken, idToken } = keycloak;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (token == null || refreshToken == null) {
          throw new Error("Keycloak token null after refresh");
        }
        return {
          accessToken: token,
          refreshToken,
          idToken,
        };
      },
      []
    ),
    idleTimer,
    portal,
    disabled: isTestMode || idleTimerState === "idle",
  });

  const handleKeycloakWhenAuthenticated = useCallback(
    (options: AuthenticateOptions = {}) => {
      const { maintainLastSession = false } = options;
      if (keycloak.authenticated) {
        const { token, tokenParsed, idTokenParsed } = keycloak;
        if (!token || !tokenParsed || !idTokenParsed) {
          throw Error(
            "keycloak is authenticated but token, tokenParsed and/or idTokenParsed is falsy."
          );
        }
        dispatch(
          initializeAuth({
            isAuthenticated: true,
            accessToken: keycloak.token!,
            idToken: keycloak.idToken!,
            refreshToken: keycloak.refreshToken!,
            user: keycloakTokenToUser(tokenParsed),
          })
        );

        const currentSessionId = idTokenParsed.sid ?? null;
        if (
          !currentSessionId ||
          currentSessionId !== lastSessionIdRef.current
        ) {
          dispatch(
            loginAction({ sessionId: currentSessionId, maintainLastSession })
          );
        }
      } else {
        dispatch(
          initializeAuth({
            isAuthenticated: false,
          })
        );
      }
    },
    [dispatch]
  );

  const handleKeycloakError = useCallback(
    (error: unknown) => {
      // NOTE: Keycloak throws `undefined` when it encountered an error.
      const anError =
        error ??
        new AuthError(
          "Unknown error trying to authenticate. No more information is available."
        );

      console.error(
        "AuthProvider.authenticate encountered an error calling keycloak.init.",
        anError
      );
      dispatch(errorAuth(anError));
    },
    [dispatch]
  );

  useEffect(() => {
    const { isAuthenticated, accessToken, refreshToken, idToken } =
      authStateRef.current;
    if (!isAuthenticated || hasInitializedKeycloak.current) {
      setIsReady(true);
      return;
    }

    keycloak
      .init({
        ...keycloakInitOptions,
        token: accessToken,
        refreshToken: refreshToken,
        idToken: idToken ?? undefined,
      })
      .then(() => {
        hasInitializedKeycloak.current = true;
      })
      .catch((err: unknown) => {
        console.error("Error initializing keycloak from storage:", err);

        // The most likely reason is that the token has expired.
        // Reset the authentication state because it is no longer valid. The user
        // will be sent to the login screen.
        dispatch(initializeAuth({ isAuthenticated: false }));
      })
      .finally(() => {
        setIsReady(true);
      });
  }, [dispatch, setIsReady]);

  const authenticate = useCallback(
    async (options: AuthenticateOptions = {}) => {
      if (isInitializing.current) {
        return;
      }

      // Setting isInitializing prevents `keycloak.init` be called more than
      // once before redirects, which could be the case when `React.StrictMode`
      // is in effect.
      isInitializing.current = true;

      try {
        if (!keycloak.authenticated || !authStateRef.current.isAuthenticated) {
          // If there is no authentication status, calling this will redirect
          // user to single sign-on page. The user will then be redirected back to
          // this app, where this `init` function will be called again to process
          // tokens in the callback URL.
          await keycloak.init({
            ...keycloakInitOptions,
            onLoad: "login-required",
          });
          hasInitializedKeycloak.current = true;
          handleKeycloakWhenAuthenticated(options);
        }
      } catch (error: unknown) {
        handleKeycloakError(error);
      }

      // isInitializing is used to prevent race conditions
      // eslint-disable-next-line require-atomic-updates
      isInitializing.current = false;
    },
    [handleKeycloakWhenAuthenticated, handleKeycloakError]
  );

  useEffect(() => {
    setIdleTimerDisabled(!authState.isAuthenticated || !isReady);
  }, [authState.isAuthenticated, isReady, setIdleTimerDisabled]);

  const logout = useCallback(async () => {
    try {
      dispatch(logoutAuth());

      // Emit logout message to other tabs
      idleTimerRef.current.message("logout", false);

      if (hasInitializedKeycloak.current) {
        await keycloak.logout({
          redirectUri: new URL(
            `${AppRoutes.Home.path.replace(/^\//i, "")}`,
            `${window.location.origin}${basename}`
          ).href,
        });
      } else {
        // When keycloak is not initialized, calling keycloak.logout will cause
        // error. Because user is not authenticated, we redirect user to log in
        // page instead.
        await authenticate();
      }
    } catch (error: unknown) {
      console.error(
        "AuthProvider.logout encountered an error calling keycloak.logout.",
        error
      );
      dispatch(errorAuth(error));
    }
  }, [authenticate, basename, dispatch]);

  // If logged out in other tab, navigate to login screen
  useEffect(() => {
    if (didLogoutInOtherTab) {
      dispatch(initializeAuth({ isAuthenticated: false }));
      resetDidLogoutInOtherTab();
    }
  }, [didLogoutInOtherTab, dispatch, resetDidLogoutInOtherTab]);

  const values = useMemo(
    () => ({
      authenticate,
      logout,
      portal,
      authClient: authClientRef.current,
      authQueries: defaultQueries,
      getAccessToken,
      isReady,
    }),
    [authenticate, logout, portal, getAccessToken, isReady]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export interface UseAuthValues {
  isAuthenticated: boolean;
  hasVerificationToken: boolean;
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  currentUser: User | null;
  authenticate: (options?: AuthenticateOptions) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: (forceRefresh?: boolean) => Promise<string | null>;
  lastError: unknown;
  portal: PortalType;
  isLoggingOut: boolean;
  isReady: boolean;
}

export function useAuth(): UseAuthValues {
  const {
    accessToken,
    idToken,
    refreshToken,
    isAuthenticated,
    currentUser,
    lastError,
    isLoggingOut,
  } = useSelector((state: RootState) => state.auth);
  const verifyAuthState = useSelector((state: RootState) => state.verifyAuth);

  const { authenticate, logout, getAccessToken, portal, isReady } =
    useContext(AuthContext);

  return {
    hasVerificationToken: verifyAuthState !== null,
    isAuthenticated,
    accessToken,
    idToken,
    refreshToken,
    authenticate,
    logout,
    getAccessToken,
    currentUser,
    lastError,
    portal,
    isLoggingOut,
    isReady,
  };
}

export const useCurrentUser = (): User => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  if (!currentUser) {
    throw new Error(
      "There is no current user. Make sure your screen is included in a hierarchy that contains `<ProtectedRoute>`, which will make sure there is a current user. In the case that user is optional, use `useAuth`."
    );
  }
  return currentUser;
};

export function useAuthClient(): APIClient {
  const { authClient: client } = useContext(AuthContext);
  return client;
}

export function useAuthQueries(): AuthProviderQueries {
  const { authQueries } = useContext(AuthContext);
  return authQueries;
}
