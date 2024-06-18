import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { VerifyOTPAPISchema } from "../apis/CommonAuthenticationAPI";
import Config from "../Config";
import { useAuthClient } from "../providers/AuthProvider";

import { MutationKeys } from "./QueryKeys";

export interface VerifyForgotPasswordOTPOptions {
  verificationCodeId: string;
  otp: string;
  email: string;
}

const useVerifyForgotPasswordOTP = (): UseMutationResult<
  void,
  unknown,
  VerifyForgotPasswordOTPOptions
> => {
  const authClient = useAuthClient();
  return useMutation({
    mutationKey: MutationKeys.forgotPasswordVerifyOTP(),
    mutationFn: async ({ verificationCodeId, otp, email }) => {
      await authClient.execute(VerifyOTPAPISchema, {
        verCodeId: verificationCodeId,
        otp,
        ou: Config.commonAuth.ou,
        notiType: "EMAIL",
        email,
      });
    },
  });
};

export default useVerifyForgotPasswordOTP;
