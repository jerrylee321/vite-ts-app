import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import { AuthPasswordFormModel } from "../../components/AuthPasswordForm/AuthPasswordFormModel";
import { MessageKey } from "../../i18n/LocaleModel";
import { ValidatePasswordResult } from "../../models/CommonAuthentication";
import { useAuth } from "../../providers/AuthProvider";

import ForgotPasswordResetPasswordForm from "./ForgotPasswordResetPasswordForm";
import { useCancelForgotPasswordProps } from "./hooks";
import { ForgotPasswordScreenCommonProps } from "./models";

interface ForgotPasswordResetPasswordViewProps
  extends ForgotPasswordScreenCommonProps {
  onSubmit: (values: AuthPasswordFormModel) => void;
  isLoading: boolean;
  email?: string;
  onPasswordValidate: (password: string) => void;
  passwordValidationResult: ValidatePasswordResult;
  isPasswordValidating: boolean;
  isPasswordValid: boolean;
}

/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Login
 * @empfScreenID B7a, B7b, B7c
 * @empfNextScreenID B10
 * @empfComponent
 * @empfDesc It is a screen component of "Reset Password". It wraps the form components.
 *
 * @empfPortal trustee
 * @empfConnMap Overview - Login
 * @empfScreenID B7, B7b, B7c
 * @empfComponent
 * @empfDesc It is a screen component of "Reset Password". It wraps the form components.
 *
 * @empfPortal orso
 * @empfConnMap Overview - Login
 * @empfScreenID B6, B6a, B6b
 * @empfComponent
 * @empfDesc It is a screen component of "Reset Password". It wraps the form components.
 * @empfAction resetPassword - Reset Password by clicking reset button
 * @empfActionDesc resetPassword - This API is for submitting new password for
 * reset password.
 * @empfAPI resetPassword - ORSO-FORGOTPW-API004
 */
const ForgotPasswordResetPasswordView = ({
  variant,
  onSubmit,
  isLoading,
  email,
  onPasswordValidate,
  passwordValidationResult,
  isPasswordValidating,
  isPasswordValid,
}: ForgotPasswordResetPasswordViewProps): ReactElement => {
  const { portal } = useAuth();

  const cancelProps = useCancelForgotPasswordProps();

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
          i18nKey={`ForgotPasswordResetPasswordView.title.${variant}`}
        />
      </Typography>
      <Typography className="my-2 text-sm text-auth-contrastText">
        <Trans<MessageKey> i18nKey="ForgotPasswordResetPasswordView.instruction" />
      </Typography>
      <ForgotPasswordResetPasswordForm
        onSubmit={onSubmit}
        onPasswordValidate={onPasswordValidate}
        isPasswordValidating={isPasswordValidating}
        passwordValidationResult={passwordValidationResult}
        isSubmitting={isLoading}
        portal={portal}
        variant={variant}
        email={email}
        isPasswordValid={isPasswordValid}
      />
      <div className="text-center">
        <Link
          className="text-sm font-bold text-auth-contrastText"
          {...cancelProps}
        >
          <Trans<MessageKey> i18nKey="AuthLayout.backToLogin" />
        </Link>
      </div>
    </main>
  );
};
export default ForgotPasswordResetPasswordView;
