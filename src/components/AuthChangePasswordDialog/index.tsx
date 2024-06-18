import { ReactElement, useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import usePasswordValidator from "../../hooks/usePasswordValidator";
import useShowErrors from "../../hooks/useShowErrors";
import { MessageKey } from "../../i18n/LocaleModel";
import {
  useAuth,
  useAuthQueries,
  useCurrentUser,
} from "../../providers/AuthProvider";
import { useErrorAlert } from "../../providers/ErrorAlertProvider";
import { fallback } from "../../types/Nullable";
import AuthDialog, { AuthDialogProps } from "../AuthDialog";
import MessageDialogWithActions from "../MessageDialogWithActions";

import AuthChangePasswordForm from "./AuthChangePasswordForm";
import { AuthChangePasswordFormModel } from "./AuthChangePasswordFormModel";

type AuthChangePasswordDialogProps = Omit<AuthDialogProps, "children">;

/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Overview
 * @empfScreenID A7
 * @empfComponent
 * @empfDesc It is a dialog component of "Change Password". It wraps the form components.
 * @empfProp open
 * @empfProp onClose
 *
 * @empfPortal trustee
 * @empfConnMap Overview - Overview
 * @empfScreenID A8
 * @empfComponent
 * @empfDesc It is a dialog component of "Change Password". It wraps the form components.
 * @empfProp open
 * @empfProp onClose
 *
 * @empfPortal orso
 * @empfConnMap Overview
 * @empfScreenID A4a
 * @empfComponent
 * @empfDesc It is a dialog component of "Change Password". It wraps the form components.
 * @empfProp open
 * @empfProp onClose
 * @empfAction handleSubmit - Change Password by clicking submit button
 * @empfActionDesc handleSubmit - This API is for submitting new password for
 * change password.
 * @empfAPI handleSubmit - AUTH-API101
 */
const AuthChangePasswordDialog = ({
  open,
  onClose,
}: AuthChangePasswordDialogProps): ReactElement => {
  const { userID, username, email } = useCurrentUser();
  const { useChangePassword } = useAuthQueries();
  const { portal, logout } = useAuth();
  const { mutateAsync: changePassword, isLoading } = useChangePassword();
  const { show: showError } = useErrorAlert();
  const { t } = useTranslation();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const [validatePassword, setValidatePassword] = useState("");

  const {
    result: passwordValidationResult,
    isValid: isPasswordValid,
    isValidating: isPasswordValidating,
    error: passwordValidationError,
  } = usePasswordValidator(validatePassword, {
    username: portal === "orso" ? username : email,
  });

  useShowErrors([passwordValidationError]);

  const handleSubmit = useCallback(
    ({ password, newPassword }: AuthChangePasswordFormModel) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        try {
          await changePassword({ userID, password, newPassword });
          onClose();
          setOpenSuccessDialog(true);
          // TODO: Confirm behaviour after changing password
        } catch (err: unknown) {
          console.error(err);
          showError(err);
        }
      })();
    },
    [changePassword, onClose, showError, userID]
  );

  const handleCloseSuccessDialog = useCallback(() => {
    setOpenSuccessDialog(false);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    logout();
  }, [logout]);
  return (
    <>
      {open ? (
        <AuthDialog open={open} onClose={onClose}>
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
            <Trans<MessageKey> i18nKey="AuthChangePasswordDialog.title" />
          </Typography>
          <Typography className="my-2 text-xs text-auth-contrastText">
            <Trans<MessageKey> i18nKey="AuthChangePasswordDialog.instruction" />
          </Typography>
          <AuthChangePasswordForm
            onSubmit={handleSubmit}
            onPasswordValidate={setValidatePassword}
            passwordValidationResult={passwordValidationResult}
            isPasswordValidating={isPasswordValidating}
            isPasswordValid={fallback(isPasswordValid, false)}
            isSubmitting={isLoading}
            portal={portal}
          />
        </AuthDialog>
      ) : null}
      {openSuccessDialog ? (
        <MessageDialogWithActions
          title={t("AuthChangePasswordDialog.success.title")}
          icon="success"
          open={openSuccessDialog}
          onClose={handleCloseSuccessDialog}
          buttons={[
            {
              text: t("AuthChangePasswordDialog.success.button"),
              style: "secondary",
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default AuthChangePasswordDialog;
