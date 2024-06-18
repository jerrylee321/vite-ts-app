import { ReactElement, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, To } from "react-router-dom";

import { useErrorAlert } from "../providers/ErrorAlertProvider";

interface NoPermissionNavigateProps {
  to: To;
}

const NoPermissionNavigate = ({
  to,
}: NoPermissionNavigateProps): ReactElement => {
  const { show } = useErrorAlert();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    show(t("NoPermissionNavigate.message"));
  }, [show, t]);

  return <Navigate to={to} />;
};

export default NoPermissionNavigate;
