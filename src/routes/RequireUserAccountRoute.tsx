import { PropsWithChildren, ReactElement, useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import { useCurrentUser } from "../providers/AuthProvider";
import CurrentUserAccountProvider from "../providers/CurrentUserAccountProvider";
import AuthErrorScreen from "../screens/AuthErrorScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import { PortalAccount } from "../types/Portal";

interface Props extends PropsWithChildren {
  useQueryUserAccountDetails: (userID: string) => UseQueryResult<PortalAccount>;
}

/* istanbul ignore next: due to temporary disabling UAM workaround */
const RequireUserAccountRoute = ({
  children,
  useQueryUserAccountDetails,
}: Props): ReactElement => {
  const { userID } = useCurrentUser();
  const {
    data: account,
    error,
    isLoading,
  } = useQueryUserAccountDetails(userID);

  useEffect(() => {
    if (error) {
      console.error(
        "RequireUserAccountRoute: Error occurred while calling UAM:",
        error
      );
    }
  }, [error]);

  if (error) {
    return <AuthErrorScreen error={error} />;
  }

  return isLoading || !account ? (
    <AuthLoadingScreen />
  ) : (
    <CurrentUserAccountProvider account={account}>
      {children}
    </CurrentUserAccountProvider>
  );
};

export default RequireUserAccountRoute;
