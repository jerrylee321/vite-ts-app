import { ReactElement, useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button, FormControl, InputLabel } from "@mui/material";
import { Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";

import { ValidatePasswordResult } from "../../apis/CommonAuthenticationAPI";
import {
  AuthPasswordFormInitialValue,
  AuthPasswordFormModel,
  validateAuthPasswordFormValues,
} from "../../components/AuthPasswordForm/AuthPasswordFormModel";
import AuthPasswordInput from "../../components/AuthPasswordInput";
import AuthPasswordRequirementHintList from "../../components/AuthPasswordRequirementHintList";
import AuthRequirementHint from "../../components/AuthRequirementHintList/AuthRequirementHint";
import { MessageKey } from "../../i18n/LocaleModel";
import { PortalType } from "../../types/Portal";

import { ForgotPasswordResetPasswordFormSchemas } from "./ForgotPasswordResetPasswordFormModel";
import { ForgotPasswordScreenVariant } from "./models";

interface ForgotPasswordResetPasswordFormContentProps {
  formikProps: FormikProps<AuthPasswordFormModel>;
  passwordValidationResult: ValidatePasswordResult;
  isPasswordValidating: boolean;
  isSubmitting: boolean;
  variant: ForgotPasswordScreenVariant;
  isPasswordValid: boolean;
}

const ForgotPasswordResetPasswordFormContent = ({
  formikProps,
  passwordValidationResult,
  isPasswordValidating,
  isSubmitting,
  variant,
  isPasswordValid,
}: ForgotPasswordResetPasswordFormContentProps): ReactElement => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    handleReset,
    values,
    isValid,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = formikProps;

  return (
    <form className="w-full" onSubmit={handleSubmit} onReset={handleReset}>
      <FormControl fullWidth={true}>
        <InputLabel
          className="relative mx-0 my-2 translate-x-0 translate-y-0 text-sm text-auth-contrastText"
          shrink={true}
          htmlFor="newPassword"
        >
          <Trans<MessageKey> i18nKey="ForgotPasswordResetPasswordView.newPassword.label" />
        </InputLabel>
        <AuthPasswordInput
          id="newPassword"
          className="mt-0 w-full"
          data-testid="newPassword"
          required={true}
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t(
            "ForgotPasswordResetPasswordView.newPassword.placeholder"
          )}
          autoFocus={true}
        />
        {touched.newPassword || values.newPassword !== "" ? (
          <AuthPasswordRequirementHintList
            isLoading={isPasswordValidating}
            result={passwordValidationResult}
            ignores={["strength"]}
          />
        ) : null}
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel
          className="relative mx-0 my-2 translate-x-0 translate-y-0 text-sm text-auth-contrastText"
          shrink={true}
          htmlFor="confirmPassword"
        >
          <Trans<MessageKey> i18nKey="ForgotPasswordResetPasswordView.confirmPassword.label" />
        </InputLabel>
        <AuthPasswordInput
          id="confirmPassword"
          className="mt-0 w-full"
          data-testid="confirmPassword"
          required={true}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t(
            "ForgotPasswordResetPasswordView.confirmPassword.placeholder"
          )}
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <ul className="list-none p-0">
            <li>
              <AuthRequirementHint
                data-testid="AuthRequirementHint-unmatch"
                i18nKey="AuthPasswordRequirementHint.unmatch"
                isInvalid={true}
              />
            </li>
          </ul>
        ) : null}
      </FormControl>
      <FormControl fullWidth={true}>
        <Button
          id="submit"
          data-testid="submit"
          type="submit"
          className="my-5 mx-auto rounded-full bg-auth-action-main px-8 py-2 font-bold text-auth-action-contrastText disabled:bg-gray-main"
          disabled={
            isSubmitting || !isValid || !isPasswordValid || isPasswordValidating
          }
        >
          <Trans<MessageKey>
            i18nKey={`ForgotPasswordResetPasswordView.submit.button.${variant}`}
          />
        </Button>
      </FormControl>
    </form>
  );
};

export interface ForgotPasswordResetPasswordFormProps {
  onPasswordValidate: (value: string) => void;
  isPasswordValidating: boolean;
  passwordValidationResult: ValidatePasswordResult;
  isSubmitting: boolean;
  portal: PortalType;
  variant: ForgotPasswordScreenVariant;
  onSubmit: (
    values: AuthPasswordFormModel,
    helpers: FormikHelpers<AuthPasswordFormModel>
  ) => void;
  email?: string;
  isPasswordValid: boolean;
}

const ForgotPasswordResetPasswordForm = (
  props: ForgotPasswordResetPasswordFormProps
): ReactElement => {
  const {
    onSubmit,
    onPasswordValidate,
    isPasswordValidating,
    passwordValidationResult,
    isSubmitting,
    portal,
    variant,
    email,
    isPasswordValid,
  } = props;

  const schema = ForgotPasswordResetPasswordFormSchemas[portal];
  const handleValidate = useCallback(
    async (
      values: AuthPasswordFormModel
    ): Promise<FormikErrors<AuthPasswordFormModel>> => {
      onPasswordValidate(values.newPassword);

      const { errors } = validateAuthPasswordFormValues(schema, values);
      return errors;
    },
    [onPasswordValidate, schema]
  );

  const initialValues = useMemo(() => {
    return { ...AuthPasswordFormInitialValue, email: email ?? "" };
  }, [email]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validate={handleValidate}
      onSubmit={onSubmit}
    >
      {
        // eslint-disable-next-line complexity
        (formik) => (
          <ForgotPasswordResetPasswordFormContent
            formikProps={formik}
            isSubmitting={isSubmitting}
            isPasswordValidating={isPasswordValidating}
            passwordValidationResult={passwordValidationResult}
            variant={variant}
            isPasswordValid={isPasswordValid}
          />
        )
      }
    </Formik>
  );
};

export default ForgotPasswordResetPasswordForm;
