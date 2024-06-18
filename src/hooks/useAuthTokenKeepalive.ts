import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { IIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import type { JWTPayload } from "jose";

import { RootState } from "../redux";
import { updateToken as updateTokenAuth } from "../redux/auth";
import { PortalType } from "../types/Portal";
import {
  isTokenExpired,
  parsedJwtToken,
  tryParseJwtToken,
} from "../utils/auth";

export const shouldUpdateToken: (
  accessTokenParsed: JWTPayload,
  refreshTokenParsed?: JWTPayload,
  minValiditySeconds?: number
) => boolean = (
  accessTokenParsed,
  _refreshTokenParsed,
  minValiditySeconds = -1
) => {
  if (minValiditySeconds === -1) {
    return true;
  }
  // no override, check expiry
  const isExpired = isTokenExpired(accessTokenParsed, minValiditySeconds);
  if (isExpired == null) {
    // expiry unknown
    return false;
  }
  return isExpired;
};

interface TokenState {
  accessToken: string | null;
  accessTokenParsed: JWTPayload | null;
  refreshToken: string | null;
  refreshTokenParsed: JWTPayload | null;
}

export const tryParseTokens: (
  accessToken: string | null,
  refreshToken: string | null
) => TokenState = (accessToken, refreshToken) => {
  return {
    accessToken,
    accessTokenParsed: accessToken ? tryParseJwtToken(accessToken) : null,
    refreshToken,
    refreshTokenParsed: refreshToken ? tryParseJwtToken(refreshToken) : null,
  };
};

const getLogger = (silent: boolean): typeof console.log => {
  return silent
    ? () => {
        /* do nothing */
      }
    : console.info;
};

interface OnRefreshResult {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
}

interface UseAuthTokenKeepaliveOptions {
  portal: PortalType;
  minValiditySeconds: number;
  onRefresh: (refreshToken: string) => Promise<OnRefreshResult>;
  idleTimer: IIdleTimer;
  disabled?: boolean;
}

interface UseAuthTokenKeepaliveValues {
  getAccessToken: (forceRefresh?: boolean) => Promise<string | null>;
  updateTokenIfNeeded: () => Promise<boolean>;
}

const useAuthTokenKeepalive = (
  options: UseAuthTokenKeepaliveOptions
): UseAuthTokenKeepaliveValues => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const { minValiditySeconds, onRefresh, idleTimer, portal, disabled } =
    options;

  const tokenStateRef = useRef<TokenState>(
    tryParseTokens(authState.accessToken, authState.refreshToken)
  );
  useLayoutEffect(() => {
    // The token may be unable to be parsed, especially for tests with fake
    // tokens.
    tokenStateRef.current = tryParseTokens(
      authState.accessToken,
      authState.refreshToken
    );
  }, [authState.accessToken, authState.refreshToken]);

  const performRefreshToken = useCallback(async () => {
    const { refreshToken } = tokenStateRef.current;
    if (!refreshToken) {
      throw new Error("refreshToken is null");
    }
    const result = await onRefresh(refreshToken);
    dispatch(updateTokenAuth(result));
    console.info("Token is refreshed.");
    return result;
  }, [dispatch, onRefresh]);

  const updateTokenImpl = useCallback(
    async (
      updateTokenMinValiditySeconds: number,
      existingAccessToken: string,
      silent: boolean
    ) => {
      const logInfo = getLogger(silent);

      try {
        if (updateTokenMinValiditySeconds === -1) {
          logInfo("Token is being refreshed because of forced refresh.");
        } else {
          logInfo("Token is being refreshed because it is due for update.");
        }
        return await navigator.locks.request(
          `${portal}.updateToken`,
          async () => {
            const { accessToken: currentAccessToken } = tokenStateRef.current;

            /* istanbul ignore next */
            if (currentAccessToken !== existingAccessToken) {
              // The access token has changed since before the lock is acquired.
              // There is no need to refresh the token again.
              logInfo(
                "Token has been refreshed by another concurrent process. Skipping."
              );
              return null;
            }

            return performRefreshToken();
          }
        );
      } catch (e: unknown) {
        throw e;
      }
    },
    [performRefreshToken, portal]
  );

  const updateToken = useCallback(
    async (updateTokenMinValiditySeconds: number, silent: boolean) => {
      const logInfo = getLogger(silent);

      if (disabled) {
        logInfo("Token refresh is disabled.");
        return null;
      }

      const { accessToken, refreshToken } = tokenStateRef.current;
      if (!accessToken || !refreshToken) {
        throw new Error("refresh token is null");
      }
      const refreshTokenParsed =
        tokenStateRef.current.refreshTokenParsed ??
        parsedJwtToken(refreshToken);
      const accessTokenParsed =
        tokenStateRef.current.accessTokenParsed ?? parsedJwtToken(accessToken);

      const shouldUpdate = shouldUpdateToken(
        accessTokenParsed,
        refreshTokenParsed,
        updateTokenMinValiditySeconds
      );
      if (!shouldUpdate) {
        logInfo("Token is not due for refresh.");
        return null;
      }

      return updateTokenImpl(
        updateTokenMinValiditySeconds,
        accessToken,
        silent
      );
    },
    [disabled, updateTokenImpl]
  );

  const updateTokenIfNeeded = useCallback(async () => {
    if (!tokenStateRef.current.accessToken) {
      return false;
    }

    const result = await updateToken(minValiditySeconds, false);
    return !!result;
  }, [minValiditySeconds, updateToken]);

  const getAccessToken = useCallback(
    async (forceRefresh: boolean = false) => {
      if (!tokenStateRef.current.accessToken) {
        return null;
      }

      const result = await updateToken(
        forceRefresh ? -1 : minValiditySeconds,
        true
      );
      if (!result) {
        return tokenStateRef.current.accessToken;
      }
      return result.accessToken;
    },
    [minValiditySeconds, updateToken]
  );

  /* istanbul ignore next */
  useEffect(() => {
    if (!authState.isAuthenticated || disabled) {
      return () => {
        /* do nothing */
      };
    }

    const interval = setInterval(() => {
      // only refresh if tab is leader
      if (!idleTimer.isLeader()) {
        console.info("Tab is not leader, skipping refresh token.");
        return;
      }
      console.info("Tab is leader, checking if token is due for update.");
      updateTokenIfNeeded().then(null).catch(console.error);
    }, (minValiditySeconds / 2) * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [
    idleTimer,
    minValiditySeconds,
    updateTokenIfNeeded,
    authState.isAuthenticated,
    disabled,
  ]);

  return { getAccessToken, updateTokenIfNeeded };
};

export default useAuthTokenKeepalive;
