import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { ResendOTPAPISchema } from "../apis/CommonAuthenticationAPI";
import { useAuthClient } from "../providers/AuthProvider";

import { MutationKeys } from "./QueryKeys";

export interface ResendForgotPasswordOTPOptions {
  verificationCodeId: string;
}

const useResendForgotPasswordOTP = (): UseMutationResult<
  void,
  unknown,
  ResendForgotPasswordOTPOptions
> => {
  const authClient = useAuthClient();
  return useMutation({
    mutationKey: MutationKeys.forgotPasswordResendOTP(),
    mutationFn: async ({
      verificationCodeId,
    }: ResendForgotPasswordOTPOptions): Promise<void> => {
      await authClient.execute(ResendOTPAPISchema, {
        verCodeId: verificationCodeId,
      });
    },
  });
};

export default useResendForgotPasswordOTP;
