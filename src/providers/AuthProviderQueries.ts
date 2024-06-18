import useChangePassword from "../queries/useChangePassword";
import useRequestForgotPasswordOTP from "../queries/useRequestForgotPasswordOTP";
import useResendForgotPasswordOTP from "../queries/useResendForgotPasswordOTP";
import useResetForgotPassword from "../queries/useResetForgotPassword";
import useVerifyForgotPasswordOTP from "../queries/useVerifyForgotPasswordOTP";

export interface AuthProviderQueries {
  useVerifyForgotPasswordOTP: typeof useVerifyForgotPasswordOTP;
  useResendForgotPasswordOTP: typeof useResendForgotPasswordOTP;
  useRequestForgotPasswordOTP: typeof useRequestForgotPasswordOTP;
  useResetForgotPassword: typeof useResetForgotPassword;
  useChangePassword: typeof useChangePassword;
}

export const defaultQueries: AuthProviderQueries = Object.freeze({
  useVerifyForgotPasswordOTP,
  useResendForgotPasswordOTP,
  useRequestForgotPasswordOTP,
  useResetForgotPassword,
  useChangePassword,
});
