import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button, FormControl, InputLabel } from "@mui/material";
import cn from "classnames";
import { FormikProps } from "formik";

import { isAPIError, isValidationError } from "../../apis/models/APIError";
import { ReactComponent as EmailIcon } from "../../assets/icons/ic_email.svg";
import AuthImportantMessageView from "../../components/AuthImportantMessageView";
import AuthInput from "../../components/AuthInput";
import useFormikErrorsWithModel from "../../hooks/useFormikErrorsWithModel";
import useGenerateErrorContent, {
  ErrorContent,
} from "../../hooks/useGenerateErrorContent";
import { MessageKey } from "../../i18n/LocaleModel";

import { ForgotPasswordEmailFormModel } from "./ForgotPasswordEmailFormModel";

interface ForgotPasswordEmailFormContentProps {
  formikProps: FormikProps<ForgotPasswordEmailFormModel>;
  isSubmitting: boolean;
  lastError: unknown;
}

const ForgotPasswordEmailForm = ({
  formikProps,
  isSubmitting,
  lastError,
}: ForgotPasswordEmailFormContentProps): ReactElement => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    handleReset,
    values,
    errors,
    isValid,
    handleBlur,
    handleChange,
  } = formikProps;
  const generateErrorContent = useGenerateErrorContent();
  const { isErrors } = useFormikErrorsWithModel(formikProps);
  const authMessage: ErrorContent | null = useMemo(() => {
    if (isErrors.email) {
      return {
        title: t("ForgotPasswordEmailView.email.invalid"),
        message: errors.email,
      };
    }

    if (!lastError) {
      return null;
    }

    if (isValidationError(lastError)) {
      // MPFA Portal and Trustee Portal returns VALIDATION_ERROR when account
      // is not found.
      return {
        title: t("ForgotPasswordEmailView.email.invalid"),
        message: lastError.data.traceId,
      };
    }

    if (isAPIError(lastError)) {
      if (
        // ORSO Portal returns CAU0018 when account is not found.
        lastError.data.errorCode === "CAU0018"
      ) {
        return {
          title:
            lastError.data.errorMessage.en ??
            t("ForgotPasswordEmailView.email.invalid"),
          message: lastError.data.traceId,
        };
      }
    }

    return generateErrorContent(lastError);
  }, [errors.email, generateErrorContent, isErrors.email, lastError, t]);

  return (
    <form
      className={cn("w-full", {
        "pointer-events-none": isSubmitting,
      })}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <FormControl fullWidth={true}>
        <InputLabel
          className="relative mx-0 my-2 translate-x-0 translate-y-0 text-sm text-auth-contrastText"
          shrink={true}
          htmlFor="email"
        >
          <Trans<MessageKey> i18nKey="ForgotPasswordEmailView.email.label" />
        </InputLabel>
        <AuthInput
          id="email"
          className="mt-0 w-full"
          data-testid="email"
          required={true}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("ForgotPasswordEmailView.email.placeholder")}
          autoFocus={true}
          StartAdormnment={EmailIcon}
          disabled={isSubmitting}
        />
      </FormControl>
      {authMessage ? (
        <AuthImportantMessageView
          className="my-2"
          data-testid="email.invalid"
          title={authMessage.title}
          message={authMessage.message}
        />
      ) : null}
      <FormControl fullWidth={true}>
        <Button
          id="submit"
          data-testid="submitButton"
          type="submit"
          className="my-5 mx-auto rounded-full bg-auth-action-main px-8 py-2 font-bold text-auth-action-contrastText disabled:bg-gray-main"
          disabled={isSubmitting || !isValid}
        >
          <Trans<MessageKey> i18nKey="ForgotPasswordEmailView.send.button" />
        </Button>
      </FormControl>
    </form>
  );
};

export default ForgotPasswordEmailForm;
