import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { RequestOTPAPISchema } from "../apis/CommonAuthenticationAPI";
import Config from "../Config";
import { useAuthClient } from "../providers/AuthProvider";

import { MutationKeys } from "./QueryKeys";

export interface RequestForgotPasswordOTPOptions {
  email: string;
  captchaResponse?: string;
  captchaChannelCode?: string;
}

export interface RequestForgotPasswordOTPResult {
  accessToken: string;
  expiresIn: number;
  verCodeId: string;
}

const useRequestForgotPasswordOTP = (): UseMutationResult<
  RequestForgotPasswordOTPResult,
  unknown,
  RequestForgotPasswordOTPOptions
> => {
  const authClient = useAuthClient();
  return useMutation({
    mutationKey: MutationKeys.forgotPasswordRequestOTP(),
    mutationFn: async ({ email }) => {
      const res = await authClient.execute(RequestOTPAPISchema, {
        email,
        locale: "EN",
        ou: Config.commonAuth.ou,
        notiType: "EMAIL",
      });
      return res.payload;
    },
  });
};

export default useRequestForgotPasswordOTP;
