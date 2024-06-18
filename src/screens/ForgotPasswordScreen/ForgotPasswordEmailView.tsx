import { ReactElement, useEffect, useMemo, useRef } from "react";
import { Trans } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";
import { Formik } from "formik";

import { MessageKey } from "../../i18n/LocaleModel";

import ForgotPasswordEmailForm from "./ForgotPasswordEmailForm";
import {
  ForgotPasswordEmailFormInitialValue,
  ForgotPasswordEmailFormModel,
  ForgotPasswordEmailFormSchema,
} from "./ForgotPasswordEmailFormModel";
import { useCancelForgotPasswordProps } from "./hooks";
import { ForgotPasswordScreenCommonProps } from "./models";

interface ForgotPasswordEmailViewProps extends ForgotPasswordScreenCommonProps {
  prefillLoginName?: string;
  handleSubmit: (values: ForgotPasswordEmailFormModel) => void;
  isLoading: boolean;
  error: unknown;
}

/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Login
 * @empfScreenID B5, B12
 * @empfNextScreenID B5, B6, B8
 * @empfComponent
 * @empfDesc It is a screen component of "Forgot Password Request OTP". It wraps the form components.
 * @empfProp prefillLoginName
 *
 * @empfPortal trustee
 * @empfConnMap Overview - Login
 * @empfScreenID B5, B5a
 * @empfComponent
 * @empfDesc It is a screen component of "Forgot Password Request OTP". It wraps the form components.
 * @empfProp prefillLoginName
 *
 * @empfPortal orso
 * @empfConnMap Overview - Login
 * @empfScreenID B4
 * @empfComponent
 * @empfDesc It is a screen component of "Forgot Password Request OTP". It wraps the form components.
 * @empfProp prefillLoginName
 * @empfAction requestOTP - Request OTP by clicking submit button
 * @empfActionDesc requestOTP - This API is for requesting OTP for forgot password.
 * @empfAPI requestOTP - ORSO-FORGOTPW-API001
 */
const ForgotPasswordEmailView = ({
  prefillLoginName = "",
  handleSubmit,
  variant,
  isLoading,
  error,
}: ForgotPasswordEmailViewProps): ReactElement => {
  const lastPrefilledLoginNameRef = useRef("");

  const cancelProps = useCancelForgotPasswordProps();

  const initialFormValues: ForgotPasswordEmailFormModel = useMemo(() => {
    return {
      ...ForgotPasswordEmailFormInitialValue,
      email: prefillLoginName,
    };
  }, [prefillLoginName]);

  useEffect(() => {
    if (lastPrefilledLoginNameRef.current === prefillLoginName) {
      return;
    }

    if (!ForgotPasswordEmailFormSchema.isValidSync(initialFormValues)) {
      return;
    }

    handleSubmit(initialFormValues);
    lastPrefilledLoginNameRef.current = prefillLoginName;
  }, [handleSubmit, initialFormValues, prefillLoginName]);

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
          i18nKey={`ForgotPasswordEmailView.title.${variant}`}
        />
      </Typography>
      <Typography className="my-2 text-sm text-auth-contrastText">
        <Trans<MessageKey> i18nKey="ForgotPasswordEmailView.instruction" />
      </Typography>
      <Formik
        initialValues={initialFormValues}
        validationSchema={ForgotPasswordEmailFormSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <ForgotPasswordEmailForm
            formikProps={formik}
            isSubmitting={isLoading}
            lastError={error}
          />
        )}
      </Formik>
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
export default ForgotPasswordEmailView;
