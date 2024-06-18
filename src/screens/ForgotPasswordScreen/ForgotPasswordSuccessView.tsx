import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { MessageKey } from "../../i18n/LocaleModel";
import AppRoutes from "../../routes/AppRoutes";

import { ForgotPasswordScreenCommonProps } from "./models";

/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Login
 * @empfScreenID B10
 * @empfNextScreenID B1
 * @empfComponent
 * @empfDesc It is a screen component of "Reset Password Success message". It wraps a message and button components.
 *
 * @empfPortal trustee
 * @empfConnMap Overview - Login
 * @empfScreenID B10
 * @empfComponent
 * @empfDesc It is a screen component of "Reset Password Success message". It wraps a message and button components.
 *
 * @empfPortal orso
 * @empfConnMap Overview - Login
 * @empfScreenID P1
 * @empfComponent
 * @empfDesc It is a screen component of "Reset Password Success message". It wraps a message and button components.
 */
const ForgotPasswordSuccessView = ({
  variant,
}: ForgotPasswordScreenCommonProps): ReactElement => {
  return (
    <main>
      <Typography
        variant="h1"
        className="text-center text-xl font-bold text-auth-contrastText"
      >
        <Trans<MessageKey> i18nKey="AuthLayout.appTitle" />
      </Typography>
      <Typography
        variant="h2"
        className="text-center text-xl uppercase text-auth-contrastText"
      >
        <Trans<MessageKey>
          i18nKey={`ForgotPasswordSuccessView.title.${variant}`}
        />
      </Typography>
      <Button
        component={RouterLink}
        className="my-5 mx-auto block w-50 rounded-full bg-auth-action-main py-1 text-center font-bold text-auth-action-contrastText disabled:bg-gray-main"
        to={AppRoutes.Login.path}
      >
        <Trans<MessageKey> i18nKey="ForgotPasswordSuccessView.ok" />
      </Button>
    </main>
  );
};

export default ForgotPasswordSuccessView;
