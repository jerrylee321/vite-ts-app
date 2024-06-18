import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../models/user";

import { loginAction, logoutAction } from "./actions";

export type AuthState = {
  /**
   * The last session ID is needed by AuthProvider to detect whether the
   * user was asked to login.
   */
  lastSessionId: string | null;

  redirectPath: string | null;
} & (AuthStateAuthenticated | AuthStateUnauthenticated | AuthStateLoggingOut);

export interface AuthStateAuthenticated {
  isAuthenticated: true;
  accessToken: string;
  refreshToken: string;
  idToken: string | null;
  currentUser: User;
  lastError: unknown;
  isLoggingOut: false;
}

export interface AuthStateUnauthenticated {
  isAuthenticated: false;
  accessToken: null;
  refreshToken: null;
  idToken: null;
  currentUser: null;
  lastError: unknown;
  isLoggingOut: false;
}

/**
 * The store transition to this state right after the user is logged out.
 *
 * This allow the route guards (e.g. `RequireUserRoute`) to know that the user
 * is being logged out. Otherwise, the user will be redirected to login screen
 * immediately.
 */
export interface AuthStateLoggingOut {
  isAuthenticated: false;
  accessToken: null;
  refreshToken: null;
  idToken: null;
  currentUser: null;
  lastError: unknown;
  isLoggingOut: true;
}

type InitializePayload =
  | InitializePayloadAuthenticated
  | InitializePayloadUnauthenticated;

interface InitializePayloadAuthenticated {
  isAuthenticated: true;
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  user: User;
}

interface InitializePayloadUnauthenticated {
  isAuthenticated: false;
}

interface UpdateTokenPayload {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
}

export const initialState: AuthState = Object.freeze({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  idToken: null,
  currentUser: null,
  lastError: null,
  lastSessionId: null,
  redirectPath: null,
  isLoggingOut: false,
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState as AuthState,
  reducers: {
    initialize: (state, action: PayloadAction<InitializePayload>) => {
      if (action.payload.isAuthenticated) {
        const {
          accessToken,
          idToken = null,
          refreshToken,
          user,
        } = action.payload;
        return {
          ...state,
          isAuthenticated: true,
          accessToken,
          refreshToken,
          idToken,
          currentUser: user,
          lastError: null,
          isLoggingOut: false,
        };
      }
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        idToken: null,
        currentUser: null,
        lastError: null,
        redirectPath: null,
        isLoggingOut: false,
      };
    },
    updateToken: (state, action: PayloadAction<UpdateTokenPayload>) => {
      if (!state.isAuthenticated) {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    },
    error: (state, action: PayloadAction<unknown>) => {
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        idToken: null,
        currentUser: null,
        lastError: action.payload,
        isLoggingOut: false,
      };
    },
    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      return { ...state, redirectPath: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, (state) => {
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        idToken: null,
        currentUser: null,
        lastError: null,
        redirectPath: null,
        isLoggingOut: true,
      };
    });
    builder.addCase(loginAction, (state, action) => {
      return {
        ...state,
        lastSessionId: action.payload.sessionId,
      };
    });
  },
});

export const { initialize, updateToken, error, setRedirectPath } =
  authSlice.actions;

export { logoutAction as logout };

export default authSlice.reducer;
