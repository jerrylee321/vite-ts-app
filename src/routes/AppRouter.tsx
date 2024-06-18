import React, { ReactElement, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import SuspenseFallback from "../components/SuspenseFallback";
import useQueryUserAccountDetails from "../queries/useQueryUserAccountDetails";

import AppRoutes from "./AppRoutes";
import ProtectedRoute from "./ProtectedRoute";
import ReactLazyWithRetries from "./ReactLazyWithRetries";
import RequireUserAccountRoute from "./RequireUserAccountRoute";
import RequireUserRoute from "./RequireUserRoute";
import { providerRequirePermissionRouteProviderToRoutes } from "./withPermission";

const RouteErrorScreen = ReactLazyWithRetries(
  async () => import("../screens/RouteErrorScreen")
);
const SelectSchemeScreen = ReactLazyWithRetries(
  async () => import("../screens/SelectSchemeScreen")
);
const HomeScreen = ReactLazyWithRetries(
  async () => import("../screens/HomeScreen")
);
const ForgotPasswordScreen = ReactLazyWithRetries(
  async () => import("../screens/ForgotPasswordScreen")
);
const AuthLoginScreen = ReactLazyWithRetries(
  async () => import("../screens/AuthLoginScreen")
);

const routesConfig = [
  {
    element: (
      <ProtectedRoute useQueryUserAccountDetails={useQueryUserAccountDetails}>
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: AppRoutes.Home.path,
        element: <HomeScreen />,
        errorElement: <RouteErrorScreen />,
      },
    ],
  },
  {
    path: AppRoutes.Login.path,
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <AuthLoginScreen />
      </Suspense>
    ),
  },
  {
    element: (
      <AuthLayout>
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        path: AppRoutes.ForgotPassword.path,
        element: <ForgotPasswordScreen variant="forgot" />,
      },
      {
        path: AppRoutes.LoginChangePassword.path,
        element: <ForgotPasswordScreen variant="forced" />,
      },
    ],
  },
  {
    path: AppRoutes.SelectScheme.path,
    element: (
      <RequireUserRoute>
        <RequireUserAccountRoute
          useQueryUserAccountDetails={useQueryUserAccountDetails}
        >
          <AuthLayout>
            <Suspense fallback={<SuspenseFallback />}>
              <SelectSchemeScreen />
            </Suspense>
          </AuthLayout>
        </RequireUserAccountRoute>
      </RequireUserRoute>
    ),
  },
];

const decoratedRoutesConfig = providerRequirePermissionRouteProviderToRoutes(
  routesConfig,
  {
    useCanAccess: () => {
      return { isAccessible: true, isLoading: false };
    },
    otherwise: () => <></>,
  }
);

export const RoutesConfig = Object.freeze(decoratedRoutesConfig);

const router = createBrowserRouter(decoratedRoutesConfig, {
  basename: "/mpfa",
});

/* istanbul ignore next */
const AppRouter = (): ReactElement => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
