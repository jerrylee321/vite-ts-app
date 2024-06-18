import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import APIClient from "../apis/APIClient";
import { RootState } from "../redux";
import { VerifyAuthState } from "../redux/verifyAuth";
import { safeSetHeaders } from "../utils/axios";

const useConfigureAuthClient = (authClient: APIClient): void => {
  const { verificationToken } = useSelector(
    (state: RootState): Partial<Exclude<VerifyAuthState, null>> =>
      state.verifyAuth ?? {}
  );
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useLayoutEffect(() => {
    const interceptor = authClient.axios.interceptors.request.use((config) => {
      let newConfig = safeSetHeaders(config, {
        "X-eMPF-Interaction-ID": uuid(),
      });

      // `accessToken` is needed if calling logout on refresh token.
      // `verificationToken` is needed when verifying OTP.
      // If both are absent, this is usually used for the first call in
      // login or forgot password flow.
      const token = accessToken ?? verificationToken;
      if (token) {
        newConfig = safeSetHeaders(newConfig, {
          Authorization: `Bearer ${token}`,
        });
      }
      return newConfig;
    });

    return () => {
      authClient.axios.interceptors.request.eject(interceptor);
    };
  }, [accessToken, authClient, verificationToken]);
};

export default useConfigureAuthClient;
