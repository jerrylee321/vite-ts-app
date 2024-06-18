import { InferType, object, string } from "yup";

/**
 * @empfForm
 * @empfFormPortal mpfa
 * @empfFormFunction forgot password - verify otp
 *
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormFunction forgot password - verify otp
 *
 * @empfForm
 * @empfFormPortal orso
 * @empfFormFunction forgot password - verify otp
 */
export const ForgotPasswordOTPFormSchema = object({
  otp: string()
    .required()
    .documentation({ label: "ForgotPasswordOTPView.otp.label" }),
});

export type ForgotPasswordOTPFormModel = InferType<
  typeof ForgotPasswordOTPFormSchema
>;

export const ForgotPasswordOTPFormInitialValue: ForgotPasswordOTPFormModel = {
  otp: "",
};
