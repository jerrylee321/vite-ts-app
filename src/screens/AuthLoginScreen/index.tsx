import { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../providers/AuthProvider";
import AppRoutes from "../../routes/AppRoutes";
import AuthLoadingScreen from "../AuthLoadingScreen";

const AuthLoginScreen = (): ReactElement => {
  const { authenticate, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      authenticate();
    }
  }, [authenticate, isAuthenticated]);

  /* istanbul ignore next: navigate cause infinite loop on render */
  if (isAuthenticated) {
    return <Navigate to={AppRoutes.Home.path} />;
  }

  return <AuthLoadingScreen />;
};

export default AuthLoginScreen;
