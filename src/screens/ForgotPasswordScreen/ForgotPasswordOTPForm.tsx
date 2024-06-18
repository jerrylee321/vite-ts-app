import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button, FormControl, InputLabel } from "@mui/material";
import cn from "classnames";
import { Formik, FormikHelpers, FormikProps } from "formik";

import { isAPIError } from "../../apis/models/APIError";
import AuthImportantMessageView from "../../components/AuthImportantMessageView";
import AuthOTPInput from "../../components/AuthOTPInput";
import useFormikErrorsWithModel from "../../hooks/useFormikErrorsWithModel";
import useGenerateErrorContent, {
  ErrorContent,
} from "../../hooks/useGenerateErrorContent";
import { MessageKey } from "../../i18n/LocaleModel";

import {
  ForgotPasswordOTPFormInitialValue,
  ForgotPasswordOTPFormModel,
  ForgotPasswordOTPFormSchema,
} from "./ForgotPasswordOTPFormModel";
import { ForgotPasswordScreenVariant } from "./models";

interface ForgotPasswordOTPFormContentProps {
  formikProps: FormikProps<ForgotPasswordOTPFormModel>;
  isSubmitting: boolean;
  lastError?: unknown;
  className?: string;
  variant: ForgotPasswordScreenVariant;
}

const ForgotPasswordOTPFormContent = ({
  formikProps,
  isSubmitting,
  lastError,
  className,
  variant,
}: ForgotPasswordOTPFormContentProps): ReactElement => {
  const { t } = useTranslation();
  const generateErrorContent = useGenerateErrorContent();

  const {
    handleSubmit,
    handleReset,
    values,
    errors,
    handleChange,
    setFieldValue,
    setFieldTouched,
    isValid,
  } = formikProps;
  const { isErrors } = useFormikErrorsWithModel(formikProps);

  const authMessage: ErrorContent | null = useMemo(() => {
    if (isErrors.otp) {
      return {
        title: t("ForgotPasswordOTPView.error.generic.title"),
        message: errors.otp,
      };
    }

    if (!lastError) {
      return null;
    }

    if (isAPIError(lastError) && lastError.data.errorCode.startsWith("OTP")) {
      return {
        title:
          lastError.data.errorMessage.en ??
          t("ForgotPasswordOTPView.error.generic.title"),
      };
    }

    return generateErrorContent(lastError);
  }, [errors.otp, isErrors.otp, lastError, t, generateErrorContent]);

  return (
    <form
      className={cn(className, "w-full")}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <InputLabel
        className="relative mx-0 my-2 translate-x-0 translate-y-0 text-sm text-auth-contrastText"
        shrink={true}
        htmlFor="otp"
      >
        <Trans<MessageKey> i18nKey="ForgotPasswordOTPView.otp.label" />
      </InputLabel>
      <AuthOTPInput
        id="otp"
        className="mb-6 w-full"
        name="otp"
        maxLength={6}
        value={values.otp}
        onChange={handleChange}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        autoFocus={true}
      />
      {authMessage ? (
        <div className="my-2 text-center">
          <AuthImportantMessageView
            data-testid="otp.invalid"
            title={authMessage.title}
            message={authMessage.message}
          />
        </div>
      ) : null}
      <FormControl fullWidth={true}>
        <Button
          id="submit"
          data-testid="submit"
          type="submit"
          className="my-5 mx-auto rounded-full bg-auth-action-main px-8 py-2 font-bold text-auth-action-contrastText disabled:bg-gray-main"
          disabled={isSubmitting || !isValid}
        >
          <Trans<MessageKey>
            i18nKey={`ForgotPasswordOTPView.submit.button.${variant}`}
          />
        </Button>
      </FormControl>
    </form>
  );
};

export interface ForgotPasswordOTPFormProps {
  isSubmitting: boolean;
  onSubmit: (
    values: ForgotPasswordOTPFormModel,
    helpers: FormikHelpers<ForgotPasswordOTPFormModel>
  ) => void;
  lastError?: unknown;
  className?: string;
  variant: ForgotPasswordScreenVariant;
}

const ForgotPasswordOTPForm = (
  props: ForgotPasswordOTPFormProps
): ReactElement => {
  const { onSubmit, isSubmitting, lastError, className, variant } = props;

  return (
    <Formik
      initialValues={ForgotPasswordOTPFormInitialValue}
      validationSchema={ForgotPasswordOTPFormSchema}
      validateOnMount={true}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <ForgotPasswordOTPFormContent
          formikProps={formik}
          isSubmitting={isSubmitting}
          lastError={lastError}
          className={className}
          variant={variant}
        />
      )}
    </Formik>
  );
};

export default ForgotPasswordOTPForm;
