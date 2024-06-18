import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { ChangePasswordAPISchema } from "../apis/CommonAuthenticationAPI";
import Config from "../Config";
import { useAPIClient } from "../providers/APIClientProvider";

import { MutationKeys } from "./QueryKeys";

export interface ChangePasswordOptions {
  userID: string;
  password: string;
  newPassword: string;
}

const useChangePassword = (): UseMutationResult<
  void,
  unknown,
  ChangePasswordOptions
> => {
  const { apiClient } = useAPIClient();
  return useMutation({
    mutationKey: MutationKeys.changePassword(),
    mutationFn: async ({ password, newPassword }): Promise<void> => {
      await apiClient.execute(ChangePasswordAPISchema, {
        ou: Config.commonAuth.ou,
        locale: "EN",
        password,
        newPassword,
      });
    },
  });
};

export default useChangePassword;
