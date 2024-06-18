import { ReactElement, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button, FormControl, InputLabel } from "@mui/material";
import { Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";

import { ValidatePasswordResult } from "../../apis/CommonAuthenticationAPI";
import AuthPasswordInput from "../../components/AuthPasswordInput";
import { MessageKey } from "../../i18n/LocaleModel";
import { useErrorAlert } from "../../providers/ErrorAlertProvider";
import { PortalType } from "../../types/Portal";
import { criteriaUnmatchExistingPassword } from "../AuthPasswordForm/AuthPasswordFormModel";
import AuthPasswordRequirementHintList from "../AuthPasswordRequirementHintList";
import AuthRequirementHint from "../AuthRequirementHintList/AuthRequirementHint";

import {
  AuthChangePasswordFormInitialValue,
  AuthChangePasswordFormModel,
  AuthChangePasswordFormSchemas,
  validateAuthPasswordFormValues,
} from "./AuthChangePasswordFormModel";

interface AuthChangePasswordFormContentProps {
  formik: FormikProps<AuthChangePasswordFormModel>;
  passwordValidationResult: ValidatePasswordResult;
  isPasswordValidating: boolean;
  isSubmitting: boolean;
  isPasswordValid: boolean;
}

const AuthChangePasswordFormContent = ({
  formik,
  passwordValidationResult,
  isPasswordValidating,
  isSubmitting,
  isPasswordValid,
}: AuthChangePasswordFormContentProps): ReactElement => {
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
  } = formik;
  return (
    <form className="w-full" onSubmit={handleSubmit} onReset={handleReset}>
      <FormControl fullWidth={true}>
        <InputLabel
          className="relative mx-0 my-2 translate-x-0 translate-y-0 text-sm text-auth-contrastText"
          shrink={true}
          htmlFor="password"
        >
          <Trans<MessageKey> i18nKey="AuthChangePasswordDialog.password.label" />
        </InputLabel>
        <AuthPasswordInput
          id="password"
          className="mt-0 w-full"
          data-testid="password"
          required={true}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("AuthChangePasswordDialog.password.placeholder")}
          autoFocus={true}
        />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel
          className="relative mx-0 my-2 translate-x-0 translate-y-0 text-sm text-auth-contrastText"
          shrink={true}
          htmlFor="newPassword"
        >
          <Trans<MessageKey> i18nKey="AuthChangePasswordDialog.newPassword.label" />
        </InputLabel>
        <AuthPasswordInput
          id="newPassword"
          className="mt-0 w-full"
          data-testid="newPassword"
          required={true}
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t("AuthChangePasswordDialog.newPassword.placeholder")}
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
          <Trans<MessageKey> i18nKey="AuthChangePasswordDialog.confirmPassword.label" />
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
            "AuthChangePasswordDialog.confirmPassword.placeholder"
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
          data-testid="submitButton"
          type="submit"
          className="my-5 mx-auto rounded-full bg-auth-action-main py-1 px-6 font-bold text-auth-action-contrastText disabled:bg-gray-main"
          disabled={
            isSubmitting ||
            !isValid ||
            !isPasswordValid ||
            !values.newPassword ||
            isPasswordValidating
          }
        >
          <Trans<MessageKey> i18nKey="AuthChangePasswordDialog.submit.button" />
        </Button>
      </FormControl>
    </form>
  );
};

interface AuthChangePasswordFormProps {
  onPasswordValidate: (value: string) => void;
  isPasswordValidating: boolean;
  passwordValidationResult: ValidatePasswordResult;
  isSubmitting: boolean;
  onSubmit: (
    values: AuthChangePasswordFormModel,
    helpers: FormikHelpers<AuthChangePasswordFormModel>
  ) => void;
  portal: PortalType;
  isPasswordValid: boolean;
}

const AuthChangePasswordForm = (
  props: AuthChangePasswordFormProps
): ReactElement => {
  const {
    onSubmit,
    onPasswordValidate,
    passwordValidationResult,
    isSubmitting,
    isPasswordValidating,
    isPasswordValid,
    portal,
  } = props;
  const { show: showError } = useErrorAlert();
  const { t } = useTranslation();

  const schema = AuthChangePasswordFormSchemas[portal];
  const handleSubmit = useCallback(
    (
      values: AuthChangePasswordFormModel,
      helpers: FormikHelpers<AuthChangePasswordFormModel>
    ) => {
      // NOTE: Make a final check on password requirments. Failed requirements
      // will be displayed as popup.
      try {
        const { failedHintMessages: messages } = validateAuthPasswordFormValues(
          schema,
          values
        );
        if (messages.length > 0) {
          showError(t(`AuthPasswordRequirementHint.${messages[0]}`));
          return;
        }

        onSubmit(values, helpers);
      } catch (err: unknown) {
        /* istanbul ignore next */
        showError(err);
      }
    },
    [onSubmit, schema, showError, t]
  );

  const handleValidate = useCallback(
    async (
      values: AuthChangePasswordFormModel
    ): Promise<FormikErrors<AuthChangePasswordFormModel>> => {
      onPasswordValidate(values.newPassword);

      const { errors } = validateAuthPasswordFormValues(schema, values, [
        criteriaUnmatchExistingPassword,
      ]);
      return errors;
    },
    [onPasswordValidate, schema]
  );

  return (
    <Formik
      initialValues={AuthChangePasswordFormInitialValue}
      validate={handleValidate} // NOTE: Use custom validation logic
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <AuthChangePasswordFormContent
          formik={formik}
          passwordValidationResult={passwordValidationResult}
          isSubmitting={isSubmitting}
          isPasswordValidating={isPasswordValidating}
          isPasswordValid={isPasswordValid}
        />
      )}
    </Formik>
  );
};

export default AuthChangePasswordForm;
