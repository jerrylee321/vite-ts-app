import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { ResetPasswordAPISchema } from "../apis/CommonAuthenticationAPI";
import Config from "../Config";
import { useAuthClient } from "../providers/AuthProvider";

import { MutationKeys } from "./QueryKeys";

export interface ResetForgotPasswordOptions {
  verificationCodeId: string;
  email: string;
  newPassword: string;
}

const useResetForgotPassword = (): UseMutationResult<
  void,
  unknown,
  ResetForgotPasswordOptions
> => {
  const authClient = useAuthClient();
  return useMutation({
    mutationKey: MutationKeys.forgotPasswordResetPassword(),
    mutationFn: async ({
      verificationCodeId,
      newPassword,
      email,
    }: ResetForgotPasswordOptions): Promise<void> => {
      await authClient.execute(ResetPasswordAPISchema, {
        verCodeId: verificationCodeId,
        newPassword,
        ou: Config.commonAuth.ou,
        notiType: "EMAIL",
        locale: "EN",
        email,
      });
    },
  });
};

export default useResetForgotPassword;
