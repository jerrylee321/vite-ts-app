import { InferType, object, ref, string } from "yup";

/**
 * @empfForm
 * @empfFormPortal mpfa
 * @empfFormModule Mpfa
 * @empfFormFunction case_resetPassword
 * @empfFormGroup UAM
 *
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormModule User Case
 * @empfFormFunction case_resetPassword
 * @empfFormGroup UAM
 *
 * @empfForm
 * @empfFormPortal orso
 * @empfFormModule Registration
 * @empfFormFunction Reset user password
 * @empfFormGroup UAM
 */
export const ResetPasswordFormSchema = object({
  newPassword: string()
    .required("ResetUserPasswordForm.form.errors.required")
    .i18nLabel("ForgotPasswordResetPasswordView.newPassword.label"),
  confirmPassword: string()
    .required("ResetUserPasswordForm.form.errors.required")
    .oneOf(
      [ref("newPassword"), ""],
      "ResetUserPasswordForm.form.errors.notMatch"
    )
    .documentation({ validations: { oneOf: "equals: newPassword" } })
    .i18nLabel("ForgotPasswordResetPasswordView.confirmPassword.label"),
});

export type ResetPasswordFormModel = InferType<typeof ResetPasswordFormSchema>;

export const ResetPasswordFormInitialValue: ResetPasswordFormModel = {
  newPassword: "",
  confirmPassword: "",
};
