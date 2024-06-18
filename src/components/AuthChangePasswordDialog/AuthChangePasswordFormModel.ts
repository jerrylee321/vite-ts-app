import { InferType, string } from "yup";

import { PortalType } from "../../types/Portal";
import {
  AuthPasswordFormSchema,
  criteriaRequired,
  ORSOAuthPasswordFormSchema,
  validateAuthPasswordFormValues,
} from "../AuthPasswordForm/AuthPasswordFormModel";

/**
 * @empfForm
 * @empfFormPortal mpfa
 * @empfFormFunction change password
 *
 * @empfForm
 * @empfFormPortal trustee
 * @empfFormFunction change password
 */
export const AuthChangePasswordFormSchema = AuthPasswordFormSchema.shape({
  password: string()
    .required(criteriaRequired)
    .i18nLabel("AuthChangePasswordDialog.password.label"),
});

/**
 * @empfForm
 * @empfFormPortal orso
 * @empfFormFunction change password
 */
export const ORSOAuthChangePasswordFormSchema =
  ORSOAuthPasswordFormSchema.shape({
    password: string()
      .required(criteriaRequired)
      .i18nLabel("AuthChangePasswordDialog.password.label"),
  });

export const AuthChangePasswordFormSchemas: Record<
  PortalType,
  typeof AuthChangePasswordFormSchema
> = {
  mpfa: AuthChangePasswordFormSchema,
  trustee: AuthChangePasswordFormSchema,
  orso: ORSOAuthChangePasswordFormSchema,
};

export type AuthChangePasswordFormModel = InferType<
  typeof AuthChangePasswordFormSchema
>;

export const AuthChangePasswordFormInitialValue: AuthChangePasswordFormModel = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export { validateAuthPasswordFormValues };
