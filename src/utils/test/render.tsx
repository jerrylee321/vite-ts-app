import React, { PropsWithChildren, ReactElement } from "react";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import "@testing-library/jest-dom";
import { configureStore, PreloadedState, Store } from "@reduxjs/toolkit";
import { InitialEntry, Router as RemixRouter } from "@remix-run/router";
import { QueryClient, QueryState } from "@tanstack/react-query";
import {
  render,
  renderHook,
  RenderHookResult,
  RenderResult,
} from "@testing-library/react";

import { APIError } from "../../apis/models/APIError";
import {
  UserAccountDetail,
  UserGroup,
} from "../../apis/models/UserAccountDetails";
import { UserAccountDetailsResponse } from "../../apis/UserAccountDetailsAPI";
import useCurrentUserAccount from "../../hooks/useCurrentUserAccount";
import { User } from "../../models/user";
import AppProviders, { AppProvidersProps } from "../../providers/AppProviders";
import QueryKeys from "../../queries/QueryKeys";
import { reducer, RootState } from "../../redux";
import { Breadcrumb } from "../../redux/breadcrumb";
import { SelectedScheme } from "../../redux/scheme";
import { RoutesConfig } from "../../routes/AppRouter";
import { makePortalAccount } from "../../types/Portal";

import { getSuccessQueryState } from "./queries";

const routesConfig = [...RoutesConfig]; // copy

const getUserAccountDetailsQueryState = (
  userAccountDetail: UserAccountDetail,
  userGroups: UserGroup[]
): QueryState<UserAccountDetailsResponse["payload"], APIError> => {
  return getSuccessQueryState({
    userAccountDetail,
    userGroups,
  });
};

export interface RenderWithProvidersOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
  /**
   * If a user is specified, the user will be used to preload authentication
   * state. If this is `true`, a test user will be used.
   *
   * Default is `false`.
   */
  authenticated?: boolean | User;
  userAccountDetail?: UserAccountDetail;
  userGroups?: UserGroup[];
  selectedScheme?: SelectedScheme;
  breadcrumbPaths?: Breadcrumb[];
}

export const appProvidersPropsWithOptions = (
  options: RenderWithProvidersOptions
): Required<Omit<AppProvidersProps, "children">> => {
  const { authenticated = true, breadcrumbPaths = [] } = options;
  const currentUser: User | null = (() => {
    if (!authenticated) {
      return null;
    }

    return authenticated === true
      ? {
          name: "John Doe",
          email: "johndoe@example.com",
          username: "johndoe@example.com",
          role: "User",
          userID: "08c27caa-335a-44df-bdea-2d8f44024601",
        }
      : authenticated;
  })();

  const {
    selectedScheme = {
      schemeCode: "code",
      schemeName: "some-scheme-name",
      schemeRegNo: "regNo",
      schemeUuid: "uuid",
      trusteeCode: "trCode",
      trusteeName: "some-trustee-name",
      trusteeUuid: "trUuid",
    },
    preloadedState = {
      auth:
        authenticated && currentUser
          ? {
              isAuthenticated: true,
              accessToken: "some-token",
              idToken: "some-token",
              refreshToken: "some-token",
              currentUser,
              lastError: null,
              lastSessionId: "SID",
              redirectPath: null,
              isLoggingOut: false,
            }
          : {
              isAuthenticated: false,
              accessToken: null,
              idToken: null,
              refreshToken: null,
              currentUser: null,
              lastError: null,
              lastSessionId: null,
              redirectPath: null,
              isLoggingOut: false,
            },
      verifyAuth: null,
      scheme: { selectedScheme },
      breadcrumb: {
        breadcrumbs: breadcrumbPaths,
      },
    },
    store = configureStore({ reducer, preloadedState }),
    userAccountDetail = authenticated && currentUser
      ? {
          userUuid: currentUser.userID,
          userName: currentUser.name,
          userId: currentUser.userID,
          status: "ACTIVE",
          department: "dept_A",
          title: null,
          email: currentUser.email,
          officeTelNo: "123456789",
          effectiveDate: new Date(),
          endDate: new Date(),
          suspensionDate: new Date(),
          userGroupUuids: [],
          role: null,
        }
      : undefined,
    userGroups = [],
  } = options;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  if (authenticated && currentUser && userAccountDetail) {
    const { userID } = currentUser;
    const queryCache = queryClient.getQueryCache();
    queryCache.build(
      queryClient,
      { queryKey: QueryKeys.userAccountDetails(userID) },
      getUserAccountDetailsQueryState(userAccountDetail, userGroups)
    );

    jest.mocked(useCurrentUserAccount).mockReturnValue(
      makePortalAccount("mpfa", {
        userAccountDetail,
        userGroups,
      })
    );
  }

  return { reduxStore: store, queryClient };
};

const wrapperWithOptions = (
  options: RenderWithProvidersOptions
): ((props: PropsWithChildren) => ReactElement) => {
  const props = appProvidersPropsWithOptions(options);
  return ({ children }) => (
    <AppProviders {...props}>
      <MemoryRouter>{children}</MemoryRouter>
    </AppProviders>
  );
};

interface RenderRouteOptions extends RenderWithProvidersOptions {
  router?: RemixRouter;
}

/**
 * renderRouteWithProviders renders a screen with the provided path locations.
 *
 * Please use with waitForLazyLoading(screen) to wait for the lazy loading in test case;
 */
export const renderRouteWithProviders = (
  locations: InitialEntry[],
  options: RenderRouteOptions = {}
): RenderResult => {
  const {
    router = createMemoryRouter(routesConfig, {
      initialEntries: locations,
    }),
    ...restOptions
  } = options;
  const props = appProvidersPropsWithOptions(restOptions);

  return render(<RouterProvider router={router} />, {
    wrapper: ({ children }) => (
      <AppProviders {...props}>{children}</AppProviders>
    ),
  });
};

/**
 * renderWithProviders renders a UI component with the app's providers.
 * This is different than renderRoute in that the renderRoute can only
 * be used to render whole screen, while this one can be used to render
 * individual component.
 */
export const renderWithProviders = (
  ui: ReactElement,
  options: RenderWithProvidersOptions = {}
): RenderResult => {
  return render(ui, {
    wrapper: wrapperWithOptions(options),
  });
};

interface RenderHookWithProvidersOptions<Props>
  extends RenderWithProvidersOptions {
  initialProps?: Props;
}

/**
 * renderHookWithProviders renders a use hook with the app's providers.
 */
export const renderHookWithProviders = <Result, Props>(
  renderFn: (initialProps: Props) => Result,
  options: RenderHookWithProvidersOptions<Props> = {}
): RenderHookResult<Result, Props> => {
  const { initialProps, ...other } = options;
  return renderHook(renderFn, {
    wrapper: wrapperWithOptions(other),
    initialProps,
  });
};
