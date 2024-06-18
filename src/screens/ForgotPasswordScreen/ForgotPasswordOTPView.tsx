import { ReactElement, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

import { MessageKey } from "../../i18n/LocaleModel";

import ForgotPasswordOTPForm from "./ForgotPasswordOTPForm";
import { ForgotPasswordOTPFormModel } from "./ForgotPasswordOTPFormModel";
import { useCancelForgotPasswordProps } from "./hooks";
import {
  ForgotPasswordScreenCommonProps,
  ForgotPasswordScreenVariant,
} from "./models";

const calculateSecondsRemaining = (next: Date): number => {
  return Math.max(
    Math.floor((next.getTime() - new Date().getTime()) / 1000),
    0
  );
};

interface ForgotPasswordOTPViewProps extends ForgotPasswordScreenCommonProps {
  onSubmit: (values: ForgotPasswordOTPFormModel) => void;
  isLoading: boolean;
  error: unknown;
  onResend: () => void;
  isResending: boolean;
  nextSendUntil: Date;
  variant: ForgotPasswordScreenVariant;
}

/* istanbul ignore next: TODO #638 */
/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Login
 * @empfScreenID B6, B9
 * @empfNextScreenID B7a, B7b, B7c
 * @empfComponent
 * @empfDesc It is a screen component of "Forgot Password Enter OTP". It wraps the form components.
 *
 * @empfPortal trustee
 * @empfConnMap Overview - Login
 * @empfScreenID B6, B9
 * @empfComponent
 * @empfDesc It is a screen component of "Forgot Password Enter OTP". It wraps the form components.
 *
 * @empfPortal orso
 * @empfConnMap Overview - Login
 * @empfScreenID B5, B8
 * @empfComponent
 * @empfDesc It is a screen component of "Forgot Password Enter OTP". It wraps the form components.
 * @empfAction verifyOTP - Verify OTP by clicking submit button
 * @empfActionDesc verifyOTP - This API is to verifying the OTP for forgot
 * password.
 * @empfAction resendOTP - Resend OTP by clicking resend button
 * @empfActionDesc resendOTP - This API is to request resending the OTP for
 * forgot password.
 * @empfAPI verifyOTP - ORSO-FORGOTPW-API003
 * @empfAPI resendOTP - ORSO-FORGOTPW-API002
 */
const ForgotPasswordOTPView = ({
  onSubmit,
  onResend,
  error,
  isResending,
  isLoading,
  nextSendUntil,
  variant,
}: ForgotPasswordOTPViewProps): ReactElement => {
  const cancelProps = useCancelForgotPasswordProps();

  const [resendSecondsRemaining, setResendSecondsRemaining] = useState(
    calculateSecondsRemaining(nextSendUntil)
  );

  useEffect(() => {
    // Immediately set the remaining seconds when the date has changed.
    setResendSecondsRemaining(calculateSecondsRemaining(nextSendUntil));

    const handle = setInterval(() => {
      setResendSecondsRemaining(calculateSecondsRemaining(nextSendUntil));
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, [nextSendUntil]);

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
        <Trans<MessageKey> i18nKey="ForgotPasswordOTPView.title" />
      </Typography>
      <ForgotPasswordOTPForm
        className="mt-6"
        isSubmitting={isLoading}
        onSubmit={onSubmit}
        lastError={error}
        variant={variant}
      />
      <div className="mb-6 text-center">
        <Typography className="text-center text-sm text-auth-contrastText">
          <Trans
            i18nKey="ForgotPasswordOTPView.otp.haveTimeRemaining"
            values={{ count: resendSecondsRemaining }}
            components={[
              <Link
                key={0}
                data-testid="resendButton"
                component="button"
                className="align-baseline text-sm font-bold text-auth-contrastText decoration-auth-contrastText disabled:pointer-events-none disabled:opacity-50"
                onClick={onResend}
                disabled={isResending || resendSecondsRemaining > 0}
              />,
            ]}
          />
        </Typography>
      </div>
      <div className="text-center">
        <Link
          component={RouterLink}
          className="text-sm font-bold text-auth-contrastText decoration-auth-contrastText"
          {...cancelProps}
        >
          <Trans<MessageKey> i18nKey="AuthLayout.backToLogin" />
        </Link>
      </div>
    </main>
  );
};
export default ForgotPasswordOTPView;
