import React, {
  PropsWithChildren,
  ReactElement,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuid } from "uuid";

import APIClient, { APIClientRetryHeader } from "../apis/APIClient";
import Config from "../Config";
import { RootState } from "../redux";
import { safeSetHeaders } from "../utils/axios";

import { useAuth } from "./AuthProvider";

interface APIClientContextValue {
  apiClient: APIClient;

  accountSetUpClient: APIClient;
}

const APIClientContext = React.createContext<APIClientContextValue>(
  null as any
);

const apiClient = new APIClient(axios.create(), { retryEnabled: true });
apiClient.axios.interceptors.request.use((config) => {
  return safeSetHeaders(config, {
    "X-eMPF-Interaction-ID": uuid(),
    "x-empf-journey-id": uuid(),
    "X-eMPF-APIClient-ID": Config.uamApiClientId,
  });
});

const accountSetUpClient = new APIClient(axios.create());
accountSetUpClient.axios.interceptors.request.use((config) => {
  return safeSetHeaders(config, {
    "X-eMPF-Interaction-ID": uuid(),
    "X-eMPF-APIClient-ID": Config.uamApiClientId,
  });
});

const APIClientProvider = ({ children }: PropsWithChildren): ReactElement => {
  const { getAccessToken, isAuthenticated } = useAuth();

  const { accountSetUpAccessToken } = useSelector(
    (state: RootState) => state.registration
  );

  // Reset query state and inject auth header on access token change
  const queryClient = useQueryClient();
  useLayoutEffect(() => {
    const authHeaderInterceptor: number =
      apiClient.axios.interceptors.request.use(async (config) => {
        const accessToken = await getAccessToken(
          config.headers.has(APIClientRetryHeader)
        );
        if (accessToken) {
          return safeSetHeaders(config, {
            Authorization: `Bearer ${accessToken}`,
          });
        }
        return config;
      });

    let accountSetUpHeaderInterceptor: number | null = null;
    if (accountSetUpAccessToken) {
      accountSetUpHeaderInterceptor =
        accountSetUpClient.axios.interceptors.request.use((config) => {
          return safeSetHeaders(config, {
            Authorization: `Bearer ${accountSetUpAccessToken}`,
          });
        });
    }
    return () => {
      apiClient.axios.interceptors.request.eject(authHeaderInterceptor);

      if (accountSetUpHeaderInterceptor != null) {
        accountSetUpClient.axios.interceptors.request.eject(
          accountSetUpHeaderInterceptor
        );
      }
    };
  }, [getAccessToken, accountSetUpAccessToken, queryClient]);

  useLayoutEffect(() => {
    // clear cache on login / logout
    // useLayoutEffect so that this is done before children is rendered
    queryClient.resetQueries().then(null).catch(console.error);
  }, [isAuthenticated, queryClient]);

  const contextValue = useMemo(
    (): APIClientContextValue => ({
      apiClient,
      accountSetUpClient,
    }),
    []
  );

  return (
    <APIClientContext.Provider value={contextValue}>
      {children}
    </APIClientContext.Provider>
  );
};

export default APIClientProvider;

export function useAPIClient(): APIClientContextValue {
  return useContext(APIClientContext);
}
