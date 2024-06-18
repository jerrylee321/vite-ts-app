import React, { PropsWithChildren, ReactElement, useEffect } from "react";

import { useAuth } from "../providers/AuthProvider";
import AuthErrorScreen from "../screens/AuthErrorScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

interface RequireUserRouteProps extends PropsWithChildren {
  maintainLastSession?: boolean;
}

const RequireUserRoute = ({
  children,
  maintainLastSession = false,
}: RequireUserRouteProps): ReactElement => {
  const { isAuthenticated, lastError, authenticate, isLoggingOut, isReady } =
    useAuth();

  useEffect(() => {
    if (!lastError && !isAuthenticated && !isLoggingOut && isReady) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      authenticate({ maintainLastSession });
    }
  }, [
    isAuthenticated,
    lastError,
    authenticate,
    isLoggingOut,
    isReady,
    maintainLastSession,
  ]);

  if (lastError) {
    return <AuthErrorScreen error={lastError} />;
  }

  return <>{isAuthenticated && isReady ? children : <AuthLoadingScreen />}</>;
};

export default RequireUserRoute;
