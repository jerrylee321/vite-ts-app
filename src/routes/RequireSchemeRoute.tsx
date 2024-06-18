import React, { PropsWithChildren, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { RootState } from "../redux";
import AppRoutes from "../routes/AppRoutes";

const RequireSchemeRoute = ({ children }: PropsWithChildren): ReactElement => {
  const location = useLocation();
  const selectedScheme = useSelector(
    (state: RootState) => state.scheme.selectedScheme
  );

  if (!selectedScheme) {
    return (
      <Navigate
        to={AppRoutes.SelectScheme.render(location.pathname + location.search)}
      />
    );
  }

  return <>{children}</>;
};

export default RequireSchemeRoute;
