import { PropsWithChildren, ReactElement } from "react";
import { UseQueryResult } from "@tanstack/react-query";

import { PortalAccount } from "../types/Portal";

import RequireUserAccountRoute from "./RequireUserAccountRoute";
import RequireUserRoute from "./RequireUserRoute";

interface Props extends PropsWithChildren {
  useQueryUserAccountDetails: (userID: string) => UseQueryResult<PortalAccount>;
  maintainLastSession?: boolean;
}

const ProtectedRoute = ({
  children,
  useQueryUserAccountDetails,
  maintainLastSession,
}: Props): ReactElement => {
  return (
    <RequireUserRoute maintainLastSession={maintainLastSession}>
      <RequireUserAccountRoute
        useQueryUserAccountDetails={useQueryUserAccountDetails}
      >
        {children}
      </RequireUserAccountRoute>
    </RequireUserRoute>
  );
};

export default ProtectedRoute;
