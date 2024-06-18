import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Paper, Typography } from "@mui/material";
import { Formik, FormikProps } from "formik";

import useFormikErrorsWithModel from "../../hooks/useFormikErrorsWithModel";
import ActionBar, {
  ActionBarPrimaryButton,
  ActionBarSecondaryButton,
} from "../ActionBar";
import FormInput from "../FormInput";
import HeadlineText from "../HeadlineText";
import ReadOnlyTextField from "../ReadOnlyTextField";

import {
  ResetPasswordFormInitialValue,
  ResetPasswordFormModel,
  ResetPasswordFormSchema,
} from "./ResetUserPasswordFormModel";

interface ResetPasswordFormProps {
  username: string;
  userId?: string;
  loginName?: string;
  onSubmit: (values: ResetPasswordFormModel) => void;
  showResetButton?: boolean;
}

interface ResetPasswordChildrenProps
  extends FormikProps<ResetPasswordFormModel> {
  username: string;
  userId?: string;
  loginName?: string;
  showResetButton?: boolean;
}

const ResetUserPasswordFormChildren = (
  props: ResetPasswordChildrenProps
): React.ReactElement => {
  const { t } = useTranslation();
  const {
    values,
    handleSubmit,
    handleChange,
    handleReset,
    handleBlur,
    touched,
    errors,
    dirty,
    username,
    userId,
    loginName,
    showResetButton = false,
  } = props;

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors,
    touched,
  });

  return (
    <form onSubmit={handleSubmit} name="ResetUserPasswordForm">
      <Paper className="flex flex-col gap-4 rounded-2xl p-8 pb-16">
        <HeadlineText variant="h2">
          <Trans i18nKey="ResetUserPasswordForm.title" />
        </HeadlineText>
        <div className="mb-12 grid grid-cols-12 gap-4">
          <ReadOnlyTextField
            label={t("ResetUserPasswordForm.field.username")}
            value={username}
            className="col-span-4"
          />
          {userId != null ? (
            <ReadOnlyTextField
              label={t("ResetUserPasswordForm.field.userId")}
              value={userId}
              className="col-span-4"
            />
          ) : null}
          {loginName != null ? (
            <ReadOnlyTextField
              label={t("ResetUserPasswordForm.field.loginName")}
              value={loginName}
              className="col-span-4"
            />
          ) : null}
        </div>
        <FormInput
          type="password"
          id="newPassword"
          name="newPassword"
          data-testid="newPassword"
          className="sm:w-full md:w-1/2"
          label={t("ResetUserPasswordForm.form.password")}
          required={true}
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.newPassword}
          helperText={helperTexts.newPassword}
        />
        <FormInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          data-testid="confirmPassword"
          className="sm:w-full md:w-1/2"
          label={t("ResetUserPasswordForm.form.confirmPassword")}
          required={true}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.confirmPassword}
          helperText={helperTexts.confirmPassword}
        />
        <ActionBar className="fixed top-auto bottom-0 right-0 w-full">
          {showResetButton ? (
            <ActionBarSecondaryButton
              data-testid="FormResetButton"
              type="reset"
              onClick={handleReset}
            >
              <Trans i18nKey="ResetUserPasswordForm.form.clear" />
            </ActionBarSecondaryButton>
          ) : null}
          <ActionBarPrimaryButton
            data-testid="FormSubmitButton"
            type="submit"
            className="disabled:bg-gray-main"
            disabled={!dirty}
          >
            <Trans i18nKey="ResetUserPasswordForm.form.submit" />
          </ActionBarPrimaryButton>
        </ActionBar>
      </Paper>
    </form>
  );
};

const ResetUserPasswordForm = (
  props: ResetPasswordFormProps
): React.ReactElement => {
  const {
    onSubmit,
    userId,
    username,
    loginName,
    showResetButton = false,
  } = props;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={ResetPasswordFormInitialValue}
      validationSchema={ResetPasswordFormSchema}
      onSubmit={onSubmit}
    >
      {(formProps) => (
        <ResetUserPasswordFormChildren
          {...formProps}
          username={username}
          loginName={loginName}
          userId={userId}
          showResetButton={showResetButton}
        />
      )}
    </Formik>
  );
};

interface SystemResetUserPasswordFormProps {
  username: string;
  userId?: string;
  loginName?: string;
  onSubmit: () => void;
}

export const SystemResetUserPasswordForm = (
  props: SystemResetUserPasswordFormProps
): React.ReactElement => {
  const { t } = useTranslation();
  const { username, userId, loginName, onSubmit } = props;
  return (
    <Paper className="flex flex-col gap-4 rounded-2xl p-8">
      <HeadlineText variant="h2">
        <Trans i18nKey="ResetUserPasswordForm.title" />
      </HeadlineText>
      <div className="mb-1 grid grid-cols-12 gap-4">
        <ReadOnlyTextField
          label={t("ResetUserPasswordForm.field.username")}
          value={username}
          className="col-span-4"
        />
        {userId != null ? (
          <ReadOnlyTextField
            label={t("ResetUserPasswordForm.field.userId")}
            value={userId}
            className="col-span-4"
          />
        ) : null}
        {loginName != null ? (
          <ReadOnlyTextField
            label={t("ResetUserPasswordForm.field.loginName")}
            value={loginName}
            className="col-span-4"
          />
        ) : null}
      </div>
      <Typography variant="body1">
        <Trans i18nKey="ResetUserPasswordForm.generatePasswordDescription" />
      </Typography>

      <ActionBar className="fixed top-auto bottom-0 right-0 w-full">
        <ActionBarPrimaryButton
          data-testid="FormSubmitButton"
          className="disabled:bg-gray-main"
          onClick={onSubmit}
        >
          <Trans i18nKey="ResetUserPasswordForm.form.submit" />
        </ActionBarPrimaryButton>
      </ActionBar>
    </Paper>
  );
};

export default ResetUserPasswordForm;
