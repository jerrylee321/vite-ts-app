import {
  AuthPasswordFormSchema,
  ORSOAuthPasswordFormSchema,
} from "../../components/AuthPasswordForm/AuthPasswordFormModel";
import { PortalType } from "../../types/Portal";

/**
 * @empfForm
 * @empfFormPortal mpfa
 * @empfFormFunction forgot password
 *
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormFunction forgot password
 */
export const ForgotPasswordResetPasswordFormSchema = AuthPasswordFormSchema;

/**
 * @empfForm
 * @empfFormPortal orso
 * @empfFormFunction forgot password
 */
export const ORSOForgotPasswordResetPasswordFormSchema =
  ORSOAuthPasswordFormSchema;

export const ForgotPasswordResetPasswordFormSchemas: Record<
  PortalType,
  typeof AuthPasswordFormSchema
> = Object.freeze({
  mpfa: ForgotPasswordResetPasswordFormSchema,
  trustee: ForgotPasswordResetPasswordFormSchema,
  orso: ORSOForgotPasswordResetPasswordFormSchema,
});
