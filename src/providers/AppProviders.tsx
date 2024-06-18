import React, { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { Store } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";

import i18n from "../i18n";
import defaultStore from "../redux";

import APIClientProvider from "./APIClientProvider";
import AppIdleTimerProvider from "./AppIdleTimerProvider";
import AppLayoutProvider from "./AppLayoutProvider";
import AppQueryClientProvider from "./AppQueryClientProvider";
import AuthProvider from "./AuthProvider";
import ErrorAlertProvider from "./ErrorAlertProvider";
import MuiProvider from "./MuiProvider";

export interface AppProvidersProps extends React.PropsWithChildren {
  reduxStore?: Store;
  queryClient?: QueryClient;
}

const AppProviders = (props: AppProvidersProps): ReactElement => {
  const { children, reduxStore = defaultStore, queryClient } = props;

  const portal = "mpfa";

  return (
    <ReduxProvider store={reduxStore}>
      <AppQueryClientProvider queryClient={queryClient}>
        <AppIdleTimerProvider portal={portal}>
          <AuthProvider portal={portal} basename="/mpfa/">
            <APIClientProvider>
              <MuiProvider>
                <AppLayoutProvider>
                  <I18nextProvider i18n={i18n}>
                    <ErrorAlertProvider>{children}</ErrorAlertProvider>
                  </I18nextProvider>
                </AppLayoutProvider>
              </MuiProvider>
            </APIClientProvider>
          </AuthProvider>
        </AppIdleTimerProvider>
      </AppQueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
