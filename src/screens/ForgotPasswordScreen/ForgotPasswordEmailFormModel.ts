import { InferType, object, string } from "yup";

/**
 * @empfForm
 * @empfFormPortal mpfa
 * @empfFormFunction forgot password - email
 *
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormFunction forgot password - email
 *
 * @empfForm
 * @empfFormPortal orso
 * @empfFormFunction forgot password - email
 */
export const ForgotPasswordEmailFormSchema = object({
  email: string()
    .required()
    .max(100)
    .email()
    .i18nLabel("ForgotPasswordEmailView.email.label"),
});

export type ForgotPasswordEmailFormModel = InferType<
  typeof ForgotPasswordEmailFormSchema
>;

export const ForgotPasswordEmailFormInitialValue: ForgotPasswordEmailFormModel =
  {
    email: "",
  };
