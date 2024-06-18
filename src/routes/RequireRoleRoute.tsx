import { PropsWithChildren, ReactElement } from "react";
import { Navigate, To } from "react-router-dom";

import { isAdmin } from "../apis/models/UserAccountDetails";
import useCurrentUserAccount from "../hooks/useCurrentUserAccount";
import { isMpfaOrTrusteePortalAccount } from "../hooks/useCurrentUserAccountDetails";
import { PortalAccount } from "../types/Portal";

type Role = "user" | "admin";

const requiresRedirect = (account: PortalAccount, role: Role): boolean => {
  if (!isMpfaOrTrusteePortalAccount(account)) {
    return true;
  }

  const accountIsAdmin = isAdmin(account);
  return (
    (accountIsAdmin && role !== "admin") || (!accountIsAdmin && role !== "user")
  );
};

interface RequireRoleRouteProps extends PropsWithChildren {
  role: Role;
  redirect: To;
}

const RequireRoleRoute = ({
  children,
  role,
  redirect,
}: RequireRoleRouteProps): ReactElement => {
  const account = useCurrentUserAccount();
  if (requiresRedirect(account, role)) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};

export default RequireRoleRoute;
