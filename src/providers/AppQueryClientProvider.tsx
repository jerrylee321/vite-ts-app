import React, { PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Config from "../Config";

// Default handler for react-query error
const onError = (err: unknown) => {
  // If the environment is 'production', react-query prints the error anyway, so
  // there is no need to print the error ragain.
  // eslint-disable-next-line no-undef
  if (
    process.env.NODE_ENV === "production" &&
    Config.logQueryError.toLowerCase() === "true"
  ) {
    console.error(err);
  }
};

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError,
    },
    mutations: {
      onError,
    },
  },
});

interface AppQueryClientProviderProps extends PropsWithChildren {
  queryClient?: QueryClient;
}

/* istanbul ignore next */
const AppQueryClientProvider = (
  props: AppQueryClientProviderProps
): ReactElement => {
  const { queryClient = defaultQueryClient, children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppQueryClientProvider;
